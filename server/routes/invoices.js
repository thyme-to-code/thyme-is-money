const express = require('express')
const request = require('superagent')
const router = express.Router()

const db = require('../db/invoices')

// TODO impliment getInvoicesByCalendarYear
// TODO impliment getInvoicesByCalendarYear

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

// '/api/v1/invoices'
router.get('/all', (req, res) => {
  db.getInvoicesAndClientInfo()
    .then((response) => {
      res.json(response)
    })
    .catch((err) => {
      res.status(500).send(`server error`)
      console.error(err)
    })
})

router.get('/:id', (req, res) => {
  db.getInvoices(req.params.id)
    .then((client) => {
      res.json(client)
    })
    .catch((err) => {
      console.error(err)
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
  db.createInvoice(req.body)
    .then((id) => {
      res.json(id)
    })
    .catch((err) => {
      console.error(err)
      throw new Error('Failed to add invoice')
    })
})

router.patch('/update', (req, res) => {
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
