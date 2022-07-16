const config = require('./knexfile').development
const conn = require('knex')(config)

function getClients(id = null, db = conn) {
  if (id) {
    return db('clients')
      .where('id', id)
      .first()
      .then((r) => {
        if (!r) return `Error: Invalid client id: ${id}`
        return r
      })
  } else {
    return db('clients').select()
  }
}

function addClient(client, db = conn) {
  return db('clients')
    .insert(client)
    .then(([id]) => db('clients').where({ id }).first())
}

function updateClient(client, db = conn) {
  return db('clients').where('id', client.id).update(client)
}

module.exports = {
  getClients,
  addClient,
  updateClient,
}
