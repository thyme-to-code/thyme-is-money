const config = require('./knexfile').development
const conn = require('knex')(config)

function getInvoices(id = null, db = conn) {
  if (id) {
    return db('invoices').where('id', id).first()
  } else {
    return db('invoices').select()
  }
}

function getInvoiceByClientID(client_id, db = conn) {
  return db('invoices').where({ client_id })
}

function addInvoice(invoice, db = conn) {
  return db('invoices').insert(invoice)
}

function updateInvoice(invoice, db = conn) {
  return db('invoices').where('id', invoice.id).update(invoice)
}

module.exports = {
  getInvoices,
  addInvoice,
  updateInvoice,
  getInvoiceByClientID,
}
