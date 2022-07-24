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

async function createInvoice(invoice, db = conn) {
  const { client_id, total, tasks, invoice_json } = invoice
  const today = new Date().toISOString()
  try {
    await db.transaction(async (trx) => {
      const [invoice_id] = await db('invoices')
        .insert({
          client_id,
          date_sent: today,
          total,
          invoice_json,
          created_at: today,
          updated_at: today,
        })
        .transacting(trx)

      // Instead of passing all the task objects you could pass an array of task Ids
      const taskIds = tasks.map((task) => task.id)

      await db('tasks')
        .whereIn('id', taskIds)
        .update({
          invoice_id,
          status: 'invoiced',
          updated_at: today,
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
  getInvoiceByClientID,
  getInvoicesAndClientInfo,
}
