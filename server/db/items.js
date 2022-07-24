const config = require('./knexfile').development
const connection = require('knex')(config)

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

function addItemByClient(item, db = connection) {
  const { description, hours, rate, status, client_id } = item
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
      return { ...item, id }
    })
}

function deleteItemById(id, db = connection) {
  return db('items').where({ id }).delete()
}

function getItemById(id, db = connection) {
  return db('items').select().where({ id }).first()
}

function updateItemById(item, id, db = connection) {
  const { description, hours } = item
  return db(`items`)
    .where({ id })
    .update({ hours, description })
    .then(() => {
      return getItemById(id, db)
    })
}

module.exports = {
  getItems,
  addItemByClient,
  deleteItemById,
  getItemsByClient,
  updateItemById,
}
