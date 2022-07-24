const config = require('./knexfile').development
const connection = require('knex')(config)

module.exports = {
  getItems,
  addTaskByClient,
  deleteTaskById,
  getItemsByClient,
  updateTaskById,
}

function getItems(isInvoiced = 'all', db = connection) {
  if (isInvoiced === 'all') {
    return db('items')
  } else if (isInvoiced === 'yes') {
    return db('items').whereNotNull('invoice_id')
  } else if (isInvoiced === 'no') {
    return db('items').whereNull('invoice_id')
  }
}

function getItemsByClient(client, db = connection) {
  const { id, status } = client
  if (status === 'uninvoiced') {
    return db('items').where({ client_id: id }).andWhere({ invoice_id: null })
  } else {
    return db('items').where({ client_id: id })
  }
}

function addTaskByClient(task, db = connection) {
  const { description, hours, rate, status, client_id } = task
  const today = new Date()
  return db('items')
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
  return db('items').where({ id }).delete()
}

function getTaskById(id, db = connection) {
  return db('items').select().where({ id }).first()
}

function updateTaskById(task, id, db = connection) {
  const { description, hours } = task
  return db(`items`)
    .where({ id })
    .update({ hours, description })
    .then(() => {
      return getTaskById(id, db)
    })
}
