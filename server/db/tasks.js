const config = require('./knexfile').development
const connection = require('knex')(config)

module.exports = {
  getAllTasks,
  getUninvoicedTasksByClient,
  addTaskByClient,
  deleteTaskById,
  getTasksByClient,
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

function getTasksByClient(client_id, db = connection) {
  return db('tasks').where({ client_id })
}

function addTaskByClient(task, db = connection) {
  const { description, hours, rate, status, client_id } = task
  return db('tasks').insert({
    description,
    hours,
    rate,
    status,
    client_id,
  })
}

function deleteTaskById(id, db = connection) {
  return db('tasks').where({ id }).delete()
}
