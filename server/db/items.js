const config = require('./knexfile').development
const conn = require('knex')(config)

const getIsoTime = () => new Date().toISOString()

function getItems(invoicedState = 'all', db = conn) {
  if (invoicedState === 'all') {
    return db('items')
  } else if (invoicedState === 'yes') {
    return db('items').whereNotNull('invoice_id')
  } else if (invoicedState === 'no') {
    return db('items').whereNull('invoice_id')
  }
}

function addItem(item, db = conn) {
  return db('items')
    .insert({
      ...item,
      created_at: getIsoTime(),
      updated_at: getIsoTime(),
    })
    .then(([id]) => db('items').where('id', id))
}

function updateItem(item, db = conn) {
  return db(`items`)
    .where('id', item.id)
    .update({ ...item, updated_at: getIsoTime() })
    .then(() => db('items').where('id', item.id))
}

function deleteItem(id, db = conn) {
  //TODO if id doesn't exist, doesn't error.  ok?
  return db('items').where({ id }).delete()
}

module.exports = {
  getItems,
  addItem,
  updateItem,
  deleteItem,
}
