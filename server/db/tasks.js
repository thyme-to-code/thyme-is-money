const config = require('./knexfile').development
const connection = require('knex')(config)

module.exports = {
  getAllTasks,
  addTaskByClient,
  deleteTaskById,
  getTasksByClient,
}

function getAllTasks(db = connection) {
  return db('tasks').select()
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
