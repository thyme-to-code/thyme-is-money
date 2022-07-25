const config = require('./knexfile').development
const conn = require('knex')(config)

const getIsoTime = () => new Date().toISOString()

// TODO impliment getInvoicesByCalendarYear()
// TODO impliment getInvoicesByFinancialYear()

function getInvoices(id = null, db = conn) {
  if (id) {
    return db('invoices').where('id', id).first()
  } else {
    return db('invoices').select()
  }
}

function addInvoice(invoice, db = conn) {
  return db('invoices').insert(invoice)
}

function updateInvoice(invoice, db = conn) {
  return db('invoices').where('id', invoice.id).update(invoice)
}

async function createInvoice(invoiceData, db = conn) {
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
          status: 'invoiced',
          updated_at: getIsoTime(),
        })
        .transacting(trx)
    })
  } catch (err) {
    console.error(err)
  }
}

function getInvoicesAndClientInfo(db = conn) {
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
  createInvoice,
  getInvoices,
  addInvoice,
  updateInvoice,
  getInvoicesAndClientInfo,
}
