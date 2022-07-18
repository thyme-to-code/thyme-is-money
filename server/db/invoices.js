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

// const invoiceObj = {
//   client_id: null,
//   tasks: [],
//   total: null,
//   invoiceJson: {},
// }

async function createInvoice(invoice, db = conn) {
  const { client_id, total, tasks, invoice_json } = invoice
  const today = new Date()
  try {
    await db.transaction(async (trx) => {
      const [invoice_id] = await db('invoices').insert({
        client_id,
        date_sent: today,
        total,
        invoice_json,
      })

      // Instead of passing all the task objects you could pass an array of task Ids
      const taskIds = tasks.map((task) => task.id)

      await db('tasks')
        .whereIn('id', taskIds)
        .update({ invoice_id, status: 'invoiced', updated_at: today })
        .transacting(trx)
    })
  } catch (err) {
    console.error(err)
  }
}

module.exports = {
  createInvoice,
  getInvoices,
  addInvoice,
  updateInvoice,
  getInvoiceByClientID,
}
