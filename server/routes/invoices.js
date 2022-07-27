// @ts-check
const express = require('express')
const request = require('superagent')
const router = express.Router()

const db = require('../db/invoices')

// /api/v1/invoices
router.get('/', (req, res) => {
  db.getInvoices()
    .then((clients) => {
      res.json(clients)
    })
    .catch((err) => {
      console.error(err)
      throw new Error('Failed to fetch invoices')
    })
})

// TODO impliment getInvoicesByCalendarYear
// TODO impliment getInvoicesByCalendarYear

// GET /api/v1/invoices/csv?from=YYYYMMDD&to=YYYYMMDD
router.get('/csv', (req, res) => {
  db.getInvoiceCsv()
    .then((response) => {
      res.json(response)
    })
    .catch((err) => {
      res.status(500).send(`server error`)
      console.error(err)
    })
})

// /api/v1/invoices/:id
router.get('/:id', (req, res) => {
  db.getInvoice(req.params.id)
    .then((client) => {
      res.json(client)
    })
    .catch((err) => {
      console.error(err)
    })
})

// POST /api/v1/invoices/pdf
router.post('/pdf', (req, res) => {
  const invoiceApi = `https://invoice-generator.com`
  return request
    .post(invoiceApi)
    .send(req.body)
    .pipe(res.contentType('application/pdf'))
})

// POST /api/v1/invoices/
router.post('/', (req, res) => {
  db.addInvoice(req.body)
    .then((id) => {
      res.json(id)
    })
    .catch((err) => {
      console.error(err)
      throw new Error('Failed to add invoice')
    })
})

// PATCH /api/v1/invoices/
router.patch('/', (req, res) => {
  db.updateInvoice(req.body)
    .then((client) => {
      res.json(client)
    })
    .catch((err) => {
      console.error(err)
      throw new Error('Failed to update invoice')
    })
})

module.exports = router
