const express = require('express')
const router = express.Router()

const db = require('../db/items')

// GET /api/v1/items?invoiced=[yes|no]
router.get('/', (req, res) => {
  db.getItems(req.query.invoiced)
    .then((items) => {
      res.json(items)
    })
    .catch((err) => {
      res.status(500).send(err.message)
    })
})

// GET /api/v1/item/:clientId?invoiced=[yes|no]
router.get('/:clientId', (req, res) => {
  const client = { id: req.params.clientId, invoicedState: req.query.invoiced }
  db.getItemsByClient(client)
    .then((items) => {
      res.json(items)
    })
    .catch((err) => {
      res.status(500).send(err.message)
    })
})

// POST /api/v1/items
router.post('/', (req, res) => {
  const item = req.body
  console.log(item)
  db.addItem(item)
    .then((item) => {
      res.json(item)
    })
    .catch((err) => {
      res.status(500).send(err.message)
    })
})

// PATCH /api/v1/items
router.patch('/', (req, res) => {
  db.updateItem(req.body)
    .then((item) => {
      res.json(item)
    })
    .catch((err) => {
      res.status(500).send(err.message)
    })
})

// DELETE /api/v1/items/:clientId
router.delete('/:clientId', (req, res) => {
  db.deleteItem(req.params.clientId)
    .then(() => {
      res.sendStatus(200)
    })
    .catch((err) => {
      res.status(500).send(err.message)
    })
})

module.exports = router
