const express = require('express')
const path = require('path')

const server = express()

const clientRoutes = require('./routes/clients')
const invoiceRoutes = require('./routes/invoices')

server.use(express.json())
server.use(express.static(path.join(__dirname, 'public')))

const tasks = require('./routes/tasks')

server.use('/api/tasks', tasks)
server.use('/api/v1/clients', clientRoutes)
server.use('/api/v1/invoices', invoiceRoutes)

server.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/index.html'))
})

module.exports = server
