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
const pageController = require('./controllers/pagination')
const projectController = require('./controllers/project')

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

require('dotenv').config({ path: '.env' })
const db = process.env.DATABASE
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
    server.use(
      session({
        secret: process.env.SECRET,
        key: process.env.KEY,
        resave: false,
        saveUninitialized: false,
        store: new MongoStore({
          mongooseConnection: mongoose.connection
        })
      })
    )

    // Passport JS is what we use to handle our logins
    server.use(passport.initialize())
    server.use(passport.session())
    
    // Adds locals to the response
    // Locals are object sent back on all requests
    // In order for locals to be used the path must be handled in the custom express server
    // AND the page wil require a  get initial props static method - see pages/index.js
    server.use(async (req, res, next) => {
      res.locals.flashes = req.flash(),
      res.locals.cloudName = 'martinbanks',
      res.locals.user = !req.user ? false : {
        _id: req.user._id,
        name: req.user.name,
      }
      next()
    })
    
    // TODO -> Set up a router middleware


    // Redirect home page views to project list
    // Temp soluition until homepage design/purpose is decided
    server.get('/', (req, res, next) => {
      res.redirect('/projects')
    })

    // * Registering new users
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
      (req, res) => res.redirect('/account')
    )

    // * Handle login / logout
    // server.get('/login') is handled by next default routing
    server.post('/login',
      authController.login
    )
    server.get('/logout', 
      (req, res) => {
        req.logout()
        req.flash('success', 'You have been logged out')
        res.redirect('/')
      }
    )

    // * Reset forgotten password
    // Posting email for reset request
    server.post('/account/forgot',
      authController.forgot
    )
    // Counter default next routing
    server.get('/reset',
      (req, res) => {
        req.flash('error', 'A valid reset token is required')
        res.redirect('/login')
      }
    )
    // Visiting valid reset link from email
    server.get('/account/reset/:token',
      authController.validateReset,
      (req, res) => app.render(req, res, '/reset')
    )
    // Submitting new password
    server.post('/account/reset/:token',
      authController.confirmPassword,
      authController.updatePassword
    )

    // * User account and profile
    // Account details of the currently logged in user
    server.get('/account', 
      authController.checkIfLoggedIn,
      userController.profile,
      (req, res, next) => {
        res.locals.profile.email = req.user.email
        next()
      }, 
      (req, res) => app.render(req, res, '/account')
    )
    // Updating user account
    server.post('/account', 
      authController.checkIfLoggedIn,
      userController.updateAccount,
      (req, res) => app.redirect('/account')
    )

    // * Handle user profile pages
    // Get logged in users profile
    server.get('/profile',
      authController.checkIfLoggedIn,
      userController.profile,
      (req, res) => app.render(req, res, '/profile')
    )
    // Get profile by user id
    // TODO -> add new route for username
    server.get('/profile/:id',
      userController.profile,
      (req, res, next) => app.render(req, res, '/profile')
    )

    // * Get project list
    // Requesting list of all projects - redirects to paginated view
    server.get('/projects',
      (req, res, next) => {
        req.flash('warning', 'A page number must be specificed. Redirecting to projects page 1'),
        (req, res) => res.redirect('/projects/1')
      }
    )

    // * Paginated projects
    server.get('/projects/:page',
      pageController.pagination,
      (req, res, next) => {
        app.render(req, res, '/projects')
      }
    )

    // * Getting project details
    // Requesting project details
    server.get('/p/:id',
      projectController.details,
      (req, res) => app.render(req, res, '/project', req.queryParams)
    )

    // *Edit project
    server.get('/p/:id/edit',
      authController.checkIfLoggedIn,
      authController.checkIfAuthor,
      (req, res, next) => {
        app.render(req, res, '/editproject')
      }
    )

    // * Add new project
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
      projectController.add
    )

    // * Default next router handling
    // ??? remove in favour of handling all routes manually ???
    // For any routes that are not specifically handled above
    // use the default Next.js router
    server.get('*', (req, res) => {
      handle(req, res)
    })

    // * Start custom server
    server.listen(port, err => {
      if (err) throw err
      console.log([
        `${FgGreen}`,
        `=========================================`,
        '',
        `🏁   Ready on http://localhost:${port}`,
        '',
        `=========================================`,
        `${Reset}`,
      ].join('\n'))
    })
  .catch(ex => {
    console.error(ex.stack)
    process.exit(1)
  })
})



// terminal colors
const Reset = "\x1b[0m"
const Bright = "\x1b[1m"
const Dim = "\x1b[2m"
const Underscore = "\x1b[4m"
const Blink = "\x1b[5m"
const Reverse = "\x1b[7m"
const Hidden = "\x1b[8m"

const FgBlack = "\x1b[30m"
const FgRed = "\x1b[31m"
const FgGreen = "\x1b[32m"
const FgYellow = "\x1b[33m"
const FgBlue = "\x1b[34m"
const FgMagenta = "\x1b[35m"
const FgCyan = "\x1b[36m"
const FgWhite = "\x1b[37m"

const BgBlack = "\x1b[40m"
const BgRed = "\x1b[41m"
const BgGreen = "\x1b[42m"
const BgYellow = "\x1b[43m"
const BgBlue = "\x1b[44m"
const BgMagenta = "\x1b[45m"
const BgCyan = "\x1b[46m"
const BgWhite = "\x1b[47m"