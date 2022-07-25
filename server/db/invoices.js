const config = require('./knexfile').development
const conn = require('knex')(config)

// TODO move to helper library
const getIsoTime = () => new Date().toISOString()

// TODO impliment getInvoicesByCalendarYear()
// TODO impliment getInvoicesByFinancialYear()

function getInvoice(id, db = conn) {
  return db('invoices').where('id', id).first()
}

function getInvoices(db = conn) {
  return db('invoices').select()
}

async function addInvoice(invoiceData, db = conn) {
  const { invoice, items } = invoiceData
  try {
    await db.transaction(async (trx) => {
      const [invoice_id] = await db('invoices')
        .insert({
          ...invoice,
          date_sent: getIsoTime(),
          created_at: getIsoTime(),
          updated_at: getIsoTime(),
        })
        .transacting(trx)

      // Instead of passing all the item objects you could pass an array of item Ids
      const itemIds = items.map((item) => item.id)

      await db('items')
        .whereIn('id', itemIds)
        .update({
          invoice_id,
          updated_at: getIsoTime(),
        })
        .transacting(trx)
    })
  } catch (err) {
    console.error(err)
  }
}

function updateInvoice(invoice, db = conn) {
  return db('invoices').where('id', invoice.id).update(invoice)
}

function getInvoiceCsv(db = conn) {
  return db('invoices')
    .join('clients', 'invoices.client_id', 'clients.id')
    .select(
      'invoices.id as invoice_number',
      'invoices.total',
      'invoices.date_sent',
      'invoices.date_paid',
      'invoices.amount_paid',
      'clients.id as client_id',
      'clients.business_name',
      'clients.contact_name',
      'clients.email',
      'clients.rate'
    )
}

module.exports = {
  getInvoice,
  getInvoices,
  addInvoice,
  updateInvoice,
  getInvoiceCsv,
}
