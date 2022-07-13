const config = require('./knexfile').development
const conn = require('knex')(config)

function getClients(id = null, db = conn) {
  if (id) {
    return db('clients').where('id', id).first()
  } else {
    return db('clients').select()
  }
}
module.exports = {
  getClients,
}
