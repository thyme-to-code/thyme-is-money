// @ts-check
const conn = require('./conn')

const getIsoTime = () => new Date().toISOString()

/**
 * @param {string} invoicedState
 * @returns {PromiseLike<string>}
 */
function getItems(invoicedState = 'all', db = conn) {
  if (invoicedState === 'all') {
    return db('items')
  } else if (invoicedState === 'yes') {
    return db('items').whereNotNull('invoice_id')
  } else if (invoicedState === 'no') {
    return db('items').whereNull('invoice_id')
  }
}

/**
 * @param {object} item
 * @returns {PromiseLike<string>}
 */
function addItem(item, db = conn) {
  return db('items')
    .insert({
      ...item,
      created_at: getIsoTime(),
      updated_at: getIsoTime(),
    })
    .then(([id]) => db('items').where({ id }).first())
    .catch((err) => console.log(err))
}

/**
 * @param {object} item
 * @returns {PromiseLike<string>}
 */
function updateItem(item, db = conn) {
  return db(`items`)
    .where('id', item.id)
    .update({ ...item, updated_at: getIsoTime() })
    .then(() => db('items').where({ id: item.id }))
}

/**
 * @param {string} id
 * @returns {PromiseLike<string>}
 */
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
