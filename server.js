const express = require('express')
const bodyParser = require('body-parser')
const next = require('next')
const mongoose = require('mongoose')
const fs = require('fs')
const path = require('path')

const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()

const port = 3000

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
    mongoose.connect(db, {
      useNewUrlParser: true
    })
    mongoose.Promise = global.Promise
    mongoose.connection.on('error', err => {
      console.error(`⚠️ Error connecting to database ⚠️\n${err.message}`)
    })
    require('./models/Store')
    const Store = mongoose.model('Store')
  
    const server = express()
    // Takes the raw requests and turns them into usable properties on req.body
    server.use(bodyParser.json())
    server.use(bodyParser.urlencoded({ extended: true }))

    server.use(async (req, res, next) => {
      // console.log('middle ware working')
      res.locals.test = 'this is a test local'
      try {
        res.locals.logo = await readFile('assets/logo.svg')
      } catch (err) {
        console.log(err)
      }
      next()
    })

    // TODO -> Set up a router middleware
    // server.use('/', routes)

    server.get('/p/:id', async (req, res) => {
      const page = '/project'
      const queryParams = { id: req.params.id }
      try {
        const details = await Store.findById(req.params.id)
        queryParams.details = details
        app.render(req, res, page, queryParams)
      } catch (err) {
        console.error(err)
        app.render(req, res, '/404')
      }
    })

    server.get('/projects', async (req, res) => {
      let projects = {}
      try {
        projects = await Store.find()
      } catch (err) {
        console.log(err)
      }
      res.locals.projects = projects
      app.render(req, res, '/projects')
    })

    server.post('/addproject', async (req, res) => {
      console.log('posting', req.body)
      const page = '/projects'
      const queryParams = {}
      const store = new Store(req.body)
      await store.save()
      app.render(req, res, page)
    })

    server.get('/', (req, res) => {
      app.render(req, res, '/index')
    })

    server.get('*', (req, res) => {
      // console.log(res.locals)
      handle(req, res)
      // app.render(req, res, '/')
    })

    server.listen(port, err => {
      if (err) throw err
      console.log(`> Ready on http://localhost:${port}`)
    })
  })
  .catch(ex => {
    console.error(ex.stack)
    process.exit(1)
  })


