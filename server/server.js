const express = require('express')
const path = require('path')

const server = express()

const clientRoutes = require('./routes/clients')

server.use(express.json())
server.use(express.static(path.join(__dirname, 'public')))

server.use('/api/v1/clients', clientRoutes)

module.exports = server
