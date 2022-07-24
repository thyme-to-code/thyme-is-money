const config = require('./knexfile').development
const conn = require('knex')(config)

// TODO remove once redux refactored?
function getClient(id, db = conn) {
  return db('clients')
    .where('id', id)
    .first()
    .then((r) => (r ? r : `Client id ${id} not found.`))
}

function getClients(isActive = true, db = conn) {
  return db('clients').select().where({ isActive })
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
  getClients,
  addClient,
  updateClient,
}
