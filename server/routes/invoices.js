const express = require('express')
const request = require('superagent')
const router = express.Router()

const {
  getInvoices,
  createInvoice,
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

const invoiceApi = `https://invoice-generator.com`
// /api/v1/invoices/CreatePDF
router.post('/createPDF', (req, res) => {
  return request
    .post(invoiceApi)
    .send(req.body)
    .pipe(res.contentType('application/pdf'))
})

router.post('/create', (req, res) => {
  createInvoice(req.body)
    .then((id) => {
      res.json(id)
    })
    .catch((err) => {
      console.error(err)
      throw new Error('Failed to add invoice')
    })
})

router.patch('/update', (req, res) => {
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
