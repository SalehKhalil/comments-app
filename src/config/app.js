const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const routes = require('./routes')(express)
require('./view-engine')(app, express)

app.use(bodyParser.json())
app.use(routes)
app.use((_req, res) => {
  res.status(404).render('errors/not-found')
})

module.exports = app
