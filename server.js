const express = require('express')
const bodyParser = require('body-parser')
const next = require('next')
const mongoose = require('mongoose')

const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()

const port = 3000

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

    // TODO -> Set up a router middleware
    // server.use('/', routes)

    server.get('/p/:id', (req, res) => {
      const page = '/project'
      const queryParams = { id: req.params.id }
      app.render(req, res, page, queryParams)
    })

    server.post('/addproject', async (req, res) => {
      console.log('posting', req.body)
      const page = '/addproject'
      const queryParams = {}
      const store = new Store(req.body)
      await store.save()
      app.render(req, res, page)
    })

    server.get('*', (req, res) => handle(req, res))

    server.listen(port, err => {
      if (err) throw err
      console.log(`> Ready on http://localhost:${port}`)
    })
  })
  .catch(ex => {
    console.error(ex.stack)
    process.exit(1)
  })


