const express = require('express')
const router = express.Router()

const {
  getClient,
  getClients,
  addClient,
  updateClient,
} = require('../db/clients')

// base URL: /api/v1/clients
router.get('/', (req, res) => {
  //TODO add isActive query string
  getClients()
    .then((clients) => {
      res.json(clients)
    })
    .catch((err) => {
      console.error(err)
      throw new Error('Failed to fetch clients')
    })
})

// TODO remove? single client access only via redux?
router.get('/:id', (req, res) => {
  getClient(req.params.id)
    .then((client) => {
      res.json(client)
    })
    .catch((err) => {
      console.error(err)
      throw new Error('Failed to fetch client id: ' + req.params.id)
    })
})

router.post('/', (req, res) => {
  addClient(req.body)
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
      throw new Error('Failed to update client id: ' + req.body.id)
    })
})

module.exports = router
