// @ts-check
const conn = require('./conn')

const getIsoTime = () => new Date().toISOString()

function getClients(filter, db = conn) {
  if (filter === 'active') {
    return db('clients').where('isActive', true)
  } else if (filter === 'inactive') {
    return db('clients').where('isActive', false)
  } else {
    return db('clients').select()
  }
}

// TODO all active clients are in Redux, remove after refactor
function getClient(id, db = conn) {
  return db('clients')
    .where('id', id)
    .first()
    .then((r) => (r ? r : `Client id ${id} not found.`))
}

function getClientItems(client, db = conn) {
  const { id, invoicedState } = client
  if (invoicedState === 'no') {
    return db('items').whereNull('invoice_id').andWhere({ client_id: id })
  } else if (invoicedState === 'yes') {
    return db('items').whereNotNull('invoice_id').andWhere({ client_id: id })
  } else {
    return db('items').where({ client_id: id })
  }
}

function getClientInvoices(client_id, db = conn) {
  return db('invoices').where({ client_id })
}

function addClient(client, db = conn) {
  return db('clients')
    .insert({
      ...client,
      isActive: true,
      created_at: getIsoTime(),
      updated_at: getIsoTime(),
    })
    .then(([id]) => db('clients').where({ id }).first())
}

function updateClient(client, db = conn) {
  const { id } = client
  return db('clients')
    .where({ id })
    .update({ ...client, updated_at: getIsoTime() })
    .then(() => db('clients').where({ id }).first())
}

module.exports = {
  getClient,
  getClientItems,
  getClientInvoices,
  getClients,
  addClient,
  updateClient,
}
