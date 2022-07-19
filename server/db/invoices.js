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

// TODO impliment getInvoicesByYear

function addInvoice(invoice, db = conn) {
  return db('invoices').insert(invoice)
}

function updateInvoice(invoice, db = conn) {
  return db('invoices').where('id', invoice.id).update(invoice)
}

function getInvoicesAndClientInfo(db = conn) {
  return db('invoices')
    .join('clients', 'invoices.client_id', 'clients.id')
    .select(
      'invoices.id as invoice_number',
      'invoices.total',
      'invoices.date_sent',
      'invoices.date_paid',
      'clients.id as client_id',
      'clients.business_name',
      'clients.contact_name',
      'clients.email',
      'clients.rate'
    )
}

module.exports = {
  getInvoices,
  addInvoice,
  updateInvoice,
  getInvoiceByClientID,
  getInvoicesAndClientInfo,
}
