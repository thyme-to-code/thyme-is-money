const config = require('./knexfile').development
const conn = require('knex')(config)

function getClients(isActive = 'all', db = conn) {
  if (isActive === 'all') {
    return db('clients').select()
  } else if (isActive === 'yes') {
    return db('clients').where('isActive', true)
  } else if (isActive === 'no') {
    return db('clients').where('isActive', false)
  }
}

// TODO all active clients in Redux, remove after refactor
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

function addClient(client, db = conn) {
  const today = new Date().toISOString()
  return db('clients')
    .insert({
      ...client,
      isActive: true,
      created_at: today,
      updated_at: today,
    })
    .then(([id]) => db('clients').where({ id }).first())
}

function updateClient(client, db = conn) {
  const today = new Date().toISOString()
  return db('clients')
    .where('id', client.id)
    .update({ ...client, updated_at: today })
    .then(() => db('clients').where('id', client.id).first())
}

module.exports = {
  getClient,
  getClientItems,
  getClients,
  addClient,
  updateClient,
}
