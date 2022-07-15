const express = require('express')
const router = express.Router()

const { getClients, addClient, updateClient } = require('../db/clients')

router.get('/', (req, res) => {
  getClients()
    .then((clients) => {
      res.json(clients)
    })
    .catch((err) => {
      console.error(err)
      throw new Error('Failed to fetch clients')
    })
})

router.get('/:id', (req, res) => {
  // TODO add error catching in getClients for invalid :id
  getClients(req.params.id)
    .then((client) => {
      res.json(client)
    })
    .catch((err) => {
      console.error(err)
      throw new Error('Failed to fetch client id: ' + req.params.id)
    })
})

router.post('/', (req, res) => {
  const data = { ...req.body, isActive: true, created_at: new Date() }
  addClient(data)
    .then((id) => {
      res.json(id)
    })
    .catch((err) => {
      console.error(err)
      throw new Error('Failed to add client')
    })
})

router.patch('/', (req, res) => {
  updateClient(req.body)
    .then((client) => {
      res.json(client)
    })
    .catch((err) => {
      console.error(err)
      throw new Error('Failed to update client')
    })
})

module.exports = router
