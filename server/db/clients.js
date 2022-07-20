const config = require('./knexfile').development
const conn = require('knex')(config)

function getClients(id = null, db = conn) {
  if (id) {
    return db('clients')
      .where('id', id)
      .first()
      .then((r) => {
        return r ? r : `Client id ${id} not found.`
      })
  } else {
    return db('clients').select()
  }
}

function addClient(client, db = conn) {
  const today = new Date()
  return db('clients')
    .insert({
      ...client,
      isActive: true,
      created_at: today.toISOString(),
      updated_at: today.toISOString(),
    })
    .then(([id]) => db('clients').where({ id }).first())
}

function updateClient(client, db = conn) {
  const today = new Date()
  return db('clients')
    .where('id', client.id)
    .update({ ...client, updated_at: today.toISOString() })
    .then(() => db('clients').where('id', client.id).first())
}

module.exports = {
  getClients,
  addClient,
  updateClient,
}
