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

// TODO all active clients in Redux, remove after refactor
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

// GET /api/v1/client/:clientId/items?invoiced=[yes|no]
router.get('/:clientId/items', (req, res) => {
  const client = { id: req.params.clientId, invoicedState: req.query.invoiced }
  db.getClientItems(client)
    .then((items) => {
      res.json(items)
    })
    .catch((err) => {
      res.status(500).send(err.message)
    })
})

// POST /api/v1/clients
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

// PATCH /api/v1/clients
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

// DELETE /api/v1/clients
// mark isActive=false

module.exports = router
