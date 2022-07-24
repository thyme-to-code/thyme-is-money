const express = require('express')
const router = express.Router()

const db = require('../db/clients')

// /api/v1/clients?active=[yes|no]
router.get('/', (req, res) => {
  db.getClients(req.query.active)
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
  db.getClient(req.params.id)
    .then((client) => {
      res.json(client)
    })
    .catch((err) => {
      console.error(err)
      throw new Error('Failed to fetch client id: ' + req.params.id)
    })
})

router.post('/', (req, res) => {
  db.addClient(req.body)
    .then((id) => {
      res.json(id)
    })
    .catch((err) => {
      console.error(err)
      throw new Error('Failed to add client')
    })
})

router.patch('/', (req, res) => {
  db.updateClient(req.body)
    .then((client) => {
      res.json(client)
    })
    .catch((err) => {
      console.error(err)
      throw new Error('Failed to update client id: ' + req.body.id)
    })
})

module.exports = router
