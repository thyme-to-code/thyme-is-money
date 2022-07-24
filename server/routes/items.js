const express = require('express')
const router = express.Router()

const db = require('../db/items')

// GET /api/v1/items?invoiced=[yes|no]
router.get('/', (req, res) => {
  return db
    .getItems(req.query.invoiced)
    .then((items) => {
      res.json(items)
    })
    .catch((err) => {
      res.status(500).send(err.message)
    })
})

// GET /api/v1/item/:client
router.get('/:client', (req, res) => {
  const client = { id: Number(req.params.client) }
  return db
    .getItemsByClient(client)
    .then((items) => {
      res.json(items)
    })
    .catch((err) => {
      res.status(500).send(err.message)
    })
})

// TODO remove /add
// POST /api/v1/items/add
router.post('/add', (req, res) => {
  const item = req.body
  db.addItemByClient(item)
    .then((item) => {
      res.json(item)
    })
    .catch((err) => {
      res.status(500).send(err.message)
    })
})

// TODO pass id with object instead of URL?
// TODO remove /update
// PATCH /api/v1/items/update/:id
router.patch('/update/:id', (req, res) => {
  const id = Number(req.params.id)
  const updatedItem = req.body
  db.updateItemById(updatedItem, id)
    .then((item) => {
      res.json(item)
    })
    .catch((err) => {
      res.status(500).send(err.message)
    })
})

// TODO pass id with object instead of URL?
// TODO remove /delete
// DELETE /api/v1/items/delete/:id
router.delete('/delete/:id', (req, res) => {
  const id = Number(req.params.id)
  db.deleteItemById(id)
    .then(() => {
      res.sendStatus(200)
    })
    .catch((err) => {
      res.status(500).send(err.message)
    })
})

module.exports = router
