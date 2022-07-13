const express = require('express')
const path = require('path')

const server = express()

const clientRoutes = require('./routes/clients')

server.use(express.json())
server.use(express.static(path.join(__dirname, 'public')))

server.use('/api/v1/clients', clientRoutes)

server.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/index.html'))
})

module.exports = server
