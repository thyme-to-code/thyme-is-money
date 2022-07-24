const config = require('./knexfile').development
const conn = require('knex')(config)

function getItems(isInvoiced = 'all', db = conn) {
  if (isInvoiced === 'all') {
    return db('items')
  } else if (isInvoiced === 'yes') {
    return db('items').whereNotNull('invoice_id')
  } else if (isInvoiced === 'no') {
    return db('items').whereNull('invoice_id')
  }
}

function getItemsByClient(client, db = conn) {
  // TODO no status column now
  const { id, status } = client
  if (status === 'uninvoiced') {
    return db('items').where({ client_id: id }).andWhere({ invoice_id: null })
  } else {
    return db('items').where({ client_id: id })
  }
}

function addItem(item, db = conn) {
  const today = new Date().toISOString()
  return db('items')
    .insert({
      ...item,
      created_at: today,
      updated_at: today,
    })
    .then(([id]) => db('items').where('id', id))
}

function updateItem(item, db = conn) {
  const today = new Date().toISOString()
  return db(`items`)
    .where('id', item.id)
    .update({ ...item, updated_at: today })
    .then(() => db('items').where('id', item.id))
}

function deleteItem(id, db = conn) {
  //TODO if id doesn't exist, doesn't error.  ok?
  return db('items').where({ id }).delete()
}

module.exports = {
  getItems,
  getItemsByClient,
  addItem,
  updateItem,
  deleteItem,
}
