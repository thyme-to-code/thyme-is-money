const express = require('express')
const path = require('path')

const server = express()

server.use(express.json())
server.use(express.static(path.join(__dirname, 'public')))

const tasks = require('./routes/tasks')

server.use('/api/tasks', tasks)

module.exports = server
