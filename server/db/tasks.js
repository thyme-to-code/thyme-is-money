const config = require('./knexfile').development
const connection = require('knex')(config)

module.exports = {
  getAllTasks,
  getUninvoicedTasks,
  addTaskByClient,
  deleteTaskById,
  getTasksByClient,
  updateTaskById,
}

function getAllTasks(db = connection) {
  return db('tasks').select()
}

function getUninvoicedTasks(db = connection) {
  return db('tasks').where('invoice_id', null)
}

function getTasksByClient(client, db = connection) {
  const { id, status } = client
  if (status === 'uninvoiced') {
    return db('tasks').where({ client_id: id }).andWhere({ invoice_id: null })
  } else {
    return db('tasks').where({ client_id: id })
  }
}

function addTaskByClient(task, db = connection) {
  const { description, hours, rate, status, client_id } = task
  const today = new Date()
  return db('tasks')
    .insert({
      description,
      hours,
      rate,
      status,
      client_id,
      created_at: today.toISOString(),
      updated_at: today.toISOString(),
    })
    .then((id) => {
      return { ...task, id }
    })
}

function deleteTaskById(id, db = connection) {
  return db('tasks').where({ id }).delete()
}

function getTaskById(id, db = connection) {
  return db('tasks').select().where({ id }).first()
}

function updateTaskById(task, id, db = connection) {
  const { description, hours } = task
  return db(`tasks`)
    .where({ id })
    .update({ hours, description })
    .then(() => {
      return getTaskById(id, db)
    })
}
