const express = require('express')
const path = require('path')

const server = express()

const taskRoutes = require('./routes/tasks')
const clientRoutes = require('./routes/clients')
const invoiceRoutes = require('./routes/invoices')

server.use(express.json())
server.use(express.static(path.join(__dirname, 'public')))

server.use('/api/v1/tasks', taskRoutes)
server.use('/api/v1/clients', clientRoutes)
server.use('/api/v1/invoices', invoiceRoutes)

server.use('/api/v1/*', (req, res) => res.sendStatus(404))

server.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/index.html'))
})

module.exports = server
