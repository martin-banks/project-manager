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
const userControllers = require('./controllers/userControllers')
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

function readFile (file) {
  return new Promise((resolve, reject) => {
    fs.readFile(
      path.join(__dirname, file),
      (err, data) => {
        if (err) {
          return reject(err)
        }
        return resolve(data)
      }
    )
  })
}

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
    server.use(flash())

    // Adds locals to the response
    // Locals are object sent back on all requests
    // In order for locals to be used the path must be handled in the custom express server
    // AND the page wil require a  get initial props static method - see pages/index.js
    server.use(async (req, res, next) => {
      res.locals.test = '🤘'
      res.locals.flashes = req.flash(),
      res.locals.cloudName = 'martinbanks',
      res.locals.user = req.user || false
      next()
    })

    // TODO -> Set up a router middleware


    server.get('/register', (req, res, next) => {
      // Validate registration data
      // rgegister user
      // log new user in
      app.render(req ,res, '/register')
    })

    server.post('/register',
      userControllers.validateRegister,
      userControllers.register,
      (req, res) => {
        res.send('success')
      }
    )

    server.get('/login', (req, res, next) => {
      app.render(req ,res, '/login')
    })
    server.post('/login', authController.login)

    server.get('/logout', (req, res) => {
      req.logout()
      // add flashes for lo gout
      res.redirect('/')
    })

    server.get('/account', (req, res, next) => {
      app.render(req, res, '/account')
    })

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
    server.get('/projects', async (req, res) => {
      let projects = {}
      try {
        projects = await Project.find()
        res.locals.projects = projects
        app.render(req, res, '/projects')
      } catch (err) {
        // TODO -> redirect if no projects are found
        console.log(err)
      }
    })

    // Submitting new project data
    server.post('/addproject', 
      multer(multerOptions).single('image'),
      uploadToCloudinary,
      async (req, res) => {
        console.log('posting', req.body)
        req.body.keywords = req.body.keywords
          .split(',')
          .map(w => w.trim().toLowerCase())
        req.body.tech = req.body.tech
          .split(',')
          .map(w => w.trim().toLowerCase())
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

    // Home page request
    server.get('/', (req, res) => {
      app.render(req, res, '/index')
    })

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


