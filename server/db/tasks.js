const config = require('./knexfile').development
const connection = require('knex')(config)

module.exports = {
  getAllTasks,
  getUninvoicedTasksByClient,
}

function getAllTasks(db = connection) {
  return db('tasks').select()
}

function getUninvoicedTasksByClient(client, db = connection) {
  const { id, status } = client
  return db('tasks')
    .join('clients', 'clients.id', 'tasks.client_id')
    .select(
      'tasks.id',
      'tasks.description',
      'tasks.hours',
      'tasks.rate',
      'tasks.status',
      'tasks.client_id',
      'tasks.invoice_id'
    )
    .where({ status })
    .andWhere({ client_id: id })
}
