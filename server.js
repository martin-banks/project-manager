const fs = require('fs')
const next = require('next')
const express = require('express')
const expressValidator = require('express-validator')
const session = require('express-session')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const MongoStore = require('connect-mongo')(session)
const path = require('path')
const multer = require('multer')
const passport = require('passport')
const flash = require('connect-flash')

const cookieParser = require('cookie-parser')

const uploadToCloudinary = require('./uploadCloudinary')
const userController = require('./controllers/user')
const authController = require('./controllers/auth')

// Import config for passport strategy
require('./handlers/passport')

const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()

const port = 3000
const multerOptions = {
  storage: multer.memoryStorage(),
  fileFilter(req, file, next) {
    console.log('req', { req })
    console.log('file', { file })
    if (file.mimetype.startsWith('image/')) {
      next(null, true)
    } else {
      console.log('File type is not supported')
      next({ message: 'File type is not supported' }, false)
    }
  },
}

// function readFile (file) {
//   return new Promise((resolve, reject) => {
//     fs.readFile(
//       path.join(__dirname, file),
//       (err, data) => {
//         if (err) {
//           return reject(err)
//         }
//         return resolve(data)
//       }
//     )
//   })
// }

require('dotenv').config({ path: '.env' })
const db = process.env.DATABASE
console.log(process.env.DATABASE)

mongoose.connect(db, {
  useNewUrlParser: true
})
mongoose.Promise = global.Promise

// Handle connection errors
mongoose.connection.on('error', err => {
  console.error(`⚠️ Error connecting to database ⚠️\n${err.message}`)
})
// Set up data schema model
require('./models/Project')
require('./models/User')
const Project = mongoose.model('Project')
const User = mongoose.model('User')
app.prepare()
  .then(() => {
    // Set up database
    // 1: connect

    // Create custom Express server for additional server-side functionality
    const server = express()
    // Takes the raw requests and turns them into usable properties on req.body
    server.use(flash())
    server.use(bodyParser.json({ limit: '10mb', extended: true }))
    server.use(bodyParser.urlencoded({ limit: '10mb', extended: true }))

    server.use(expressValidator())

    // populates req.cookies with any cookies that came along with the request
    server.use(cookieParser());

    // Sessions allow us to store data on visitors from request to request
    // This keeps users logged in and allows us to send flash messages
    server.use(session({
      secret: process.env.SECRET,
      key: process.env.KEY,
      resave: false,
      saveUninitialized: false,
      store: new MongoStore({
        mongooseConnection: mongoose.connection
      })
    }));

    // Passport JS is what we use to handle our logins
    server.use(passport.initialize())
    server.use(passport.session())
    
    // Adds locals to the response
    // Locals are object sent back on all requests
    // In order for locals to be used the path must be handled in the custom express server
    // AND the page wil require a  get initial props static method - see pages/index.js
    server.use(async (req, res, next) => {
      res.locals.test = '🤘'
      res.locals.flashes = req.flash(),
      res.locals.cloudName = 'martinbanks',
      res.locals.user = !req.user ? false : {
        _id: req.user._id,
        name: req.user.name,
      }
      next()
    })
    
    // TODO -> Set up a router middleware
    // Home page request
    server.get('/', (req, res) => {
      app.render(req, res, '/index')
    })

    // Registering new users
    server.get('/register/:id',
      userController.checkRegisterWhitelist,
      (req, res, next) => {
        app.render(req ,res, '/register')
      }
    )
    server.get('/register', (req, res, next) => {
      req.flash('error', 'Registration is by invitation only')
      res.redirect('/')
      // app.render(req ,res, '/register')
    })
    server.post('/register',
      userController.validateRegister,
      userController.register,
      authController.login,
      (req, res) => {
        // res.send('success')
        res.redirect('/account')
      }
    )

    server.get('/login',
      (req, res, next) => {
        app.render(req, res, '/login')
      }
    )
    server.post('/login', authController.login)
    
    server.get('/logout', (req, res) => {
      req.logout()
      req.flash('success', 'You have been logged out')
      res.redirect('/')
    })

    // Account details of the currently logged in user
    server.get('/account', 
      authController.checkIfLoggedIn,
      userController.profile,
      async (req, res, next) => {
        const userDetails = await User
          .findOne({ _id: req.user._id})
          .populate('projects')
        res.locals.user.email = req.user.email        
        res.locals.projects = userDetails.projects
        app.render(req, res, '/account')
      }
    )

    server.get('/profile',
      authController.checkIfLoggedIn,
      userController.profile,
      async (req, res, next) => {
        const profile = await User
          .findOne({ _id: req.user._id })
          .populate('projects')
        res.locals.projects = profile.projects
        app.render(req, res, '/profile')
      }
    )
    server.get('/profile/:id',
      userController.profile,
      (req, res, next) => {
        app.render(req, res, '/profile')
      }
    )

    server.post('/account', 
      authController.checkIfLoggedIn,
      userController.updateAccount,
      // (req, res, next) => {
      //   req.flash('success', 'update completed')
      //   app.render(req, res, '/account')
      // }
    )

    // Requesting project details
    server.get('/p/:id', async (req, res) => {
      const page = '/project'
      const queryParams = { id: req.params.id }
      try {
        const details = await Project.findById(req.params.id)
        queryParams.details = details
        app.render(req, res, page, queryParams)
      } catch (err) {
        console.error(err)
        // TODO -> Create route for error / project not found
        app.render(req, res, '/index')
      }
    })

    // Requesting list of all projects
    server.get('/projects/:page', async (req, res) => {
      const { page } = req.params
      const limit = 4
      let skip = (page * limit) - limit
      try {
        const projectsPromise = Project
          .find()
          .skip(skip)
          .limit(limit)
          .sort({ created: -1 })
        const totalProjects = Project.count()

        const [ projects, count ] = await Promise.all([ projectsPromise, totalProjects ])
        const pages = Math.ceil(count / limit)

        res.locals.pagination = { pages, page, limit }
        res.locals.projects = projects
        app.render(req, res, '/projects')
      } catch (err) {
        // TODO -> redirect if no projects are found
        console.log(err)
      }
    })

    server.get('/addproject', 
      authController.checkIfLoggedIn,
      (req, res, next) => {
        app.render(req, res, '/addproject')
      }
    )
    
    // Submitting new project data
    server.post('/addproject', 
      authController.checkIfLoggedIn,
      // TODO merge functions with promiseAll to minimise bottle-necks
      multer(multerOptions).single('image'),
      uploadToCloudinary,
      async (req, res) => {
        // Saving to moingoDB - migrate to controller
        console.log('posting', req.body)
        // ? move keyword processing from client to server?
        req.body.keywords = req.body.keywords
          .split(',')
          .map(w => w.trim().toLowerCase())
        req.body.tech = req.body.tech
          .split(',')
          .map(w => w.trim().toLowerCase())
        req.body.author = req.user._id
        req.body.author_name = req.user.name
        console.log('body after update', req.body)
        const project = new Project(req.body)
        await project.save()
        res.redirect('/projects')
      }
    )

    server.post('/screenshot',
      (req, res, next) => {
        console.log('starting with file')
        next()
      },
      multer(multerOptions).single('image'),
      (req, res, next) => {
        console.log('post recieved')
        uploadToCloudinary(req, res, next)
      },
      (req, res, next) => {
        // console.log('cloudinary results:', Object.keys(res))
        // console.log('cloud', res['cloudinary'])
        res.redirect('/')
      }
    )


    // Default next router handling
    // For any routes that are not specifically handled above
    // use the default Next.js router
    server.get('*', (req, res) => {
      handle(req, res)
    })

    // Start server
    server.listen(port, err => {
      if (err) throw err
      console.log(`> Ready on http://localhost:${port}`)
    })
  })
  .catch(ex => {
    console.error(ex.stack)
    process.exit(1)
  })


