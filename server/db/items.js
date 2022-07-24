const config = require('./knexfile').development
const conn = require('knex')(config)

function getItems(invoicedState = 'all', db = conn) {
  if (invoicedState === 'all') {
    return db('items')
  } else if (invoicedState === 'yes') {
    return db('items').whereNotNull('invoice_id')
  } else if (invoicedState === 'no') {
    return db('items').whereNull('invoice_id')
  }
}

//TODO should this be merged with getItems?
function getItemsByClient(client, db = conn) {
  const { id, invoicedState } = client
  if (invoicedState === 'no') {
    return db('items').whereNull('invoice_id').andWhere({ client_id: id })
  } else if (invoicedState === 'yes') {
    return db('items').whereNotNull('invoice_id').andWhere({ client_id: id })
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