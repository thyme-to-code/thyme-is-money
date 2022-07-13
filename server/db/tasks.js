const config = require('./knexfile').development
const connection = require('knex')(config)

module.exports = {
  getAllTasks,
}

function getAllTasks(db = connection) {
  return db('tasks').select()
}