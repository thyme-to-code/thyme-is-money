const express = require('express')
const request = require('superagent')
const router = express.Router()

const invoiceApi = `https://invoice-generator.com`

const {
  getInvoices,
  addInvoice,
  updateInvoice,
  getInvoiceByClientID,
} = require('../db/invoices')

router.get('/', (req, res) => {
  getInvoices()
    .then((clients) => {
      res.json(clients)
    })
    .catch((err) => {
      console.error(err)
      throw new Error('Failed to fetch invoices')
    })
})

//* TODO impliment getInvoicesByYear

router.get('/:id', (req, res) => {
  getInvoices(req.params.id)
    .then((client) => {
      res.json(client)
    })
    .catch((err) => {
      console.error(err)
    })
})

router.get('/client/:client_id', (req, res) => {
  getInvoiceByClientID(req.params.client_id)
    .then((invoice) => {
      res.json(invoice)
    })
    .catch((err) => {
      console.error(err)
      throw new Error(
        'Failed to fetch invoices for client id: ' + req.params.client_id
      )
    })
})

// /api/v1/invoices/pdf
router.post('/createPDF', (req, res) => {
  return request
    .post(invoiceApi)
    .send(req.body)
    .pipe(res.contentType('application/pdf'))
})

router.post('/add', (req, res) => {
  addInvoice(req.body)
    .then((id) => {
      res.json(id)
    })
    .catch((err) => {
      console.error(err)
      throw new Error('Failed to add invoice')
    })
})

router.post('/update', (req, res) => {
  updateInvoice(req.body)
    .then((client) => {
      res.json(client)
    })
    .catch((err) => {
      console.error(err)
      throw new Error('Failed to update invoice')
    })
})

module.exports = router
