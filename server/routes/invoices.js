const express = require('express')
const router = express.Router()

const { getInvoices, addInvoice, updateInvoice } = require('../db/invoices')

router.get('/', (req, res) => {
  getInvoices()
    .then((clients) => {
      res.json(clients)
    })
    .catch((err) => {
      console.error(err)
      throw new Error('Failed to fetch clients')
    })
})

router.get('/:id', (req, res) => {
  getInvoices(req.params.id)
    .then((client) => {
      res.json(client)
    })
    .catch((err) => {
      console.error(err)
      throw new Error('Failed to fetch client id: ' + req.params.id)
    })
})

router.post('/add', (req, res) => {
  addInvoice(req.body)
    .then((id) => {
      res.json(id)
    })
    .catch((err) => {
      console.error(err)
      throw new Error('Failed to add client')
    })
})

router.post('/update', (req, res) => {
  updateInvoice(req.body)
    .then((client) => {
      res.json(client)
    })
    .catch((err) => {
      console.error(err)
      throw new Error('Failed to update client')
    })
})

module.exports = router
