const express = require('express')
const expressValidator = require('express-validator')
const bodyParser = require('body-parser')
const next = require('next')
const mongoose = require('mongoose')
const fs = require('fs')
const path = require('path')
const multer = require('multer')
const uploadToCloudinary = require('./uploadCloudinary')
const passport = require('passport')

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

require('dotenv').config({ path: 'database.env' })
const db = process.env.DATABASE

app.prepare()
  .then(() => {
    // Set up database
    // 1: connect
    mongoose.connect(db, {
      useNewUrlParser: true
    })
    mongoose.Promise = global.Promise

    // 2. Handle connection errors
    mongoose.connection.on('error', err => {
      console.error(`⚠️ Error connecting to database ⚠️\n${err.message}`)
    })

    // 3. Set up data schema model
    require('./models/Store')
    const Store = mongoose.model('Store')

    // Create custom Express server for additional server-side functionality
    const server = express()
    // Takes the raw requests and turns them into usable properties on req.body
    server.use(bodyParser.json({ limit: '10mb', extended: true }))
    server.use(bodyParser.urlencoded({ limit: '10mb', extended: true }))

    server.use(expressValidator())

    // Adds locals to the response
    // Locals are object sent back on all requests
    server.use(async (req, res, next) => {
      res.locals.test = '🤘'
      res.locals.cloudName = 'martinbanks',
      next()
    })

    // TODO -> Set up a router middleware


    sever.get('/register', (req, res, next) => {
      // Validate registration data
      // rgegister user
      // log new user in
      app.render(req ,res, '/register')
    })
    
    sever.get('/signin', (req, res, next) => {
      app.render(req ,res, '/signin')
    })

    // Requesting project details
    server.get('/p/:id', async (req, res) => {
      const page = '/project'
      const queryParams = { id: req.params.id }
      try {
        const details = await Store.findById(req.params.id)
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
        projects = await Store.find()
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
        const store = new Store(req.body)
        await store.save()
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


