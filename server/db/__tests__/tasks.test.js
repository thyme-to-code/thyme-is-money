const config = require('../knexfile')
const knex = require('knex')
const testDb = knex(config.test)

const db = require('../clients')

beforeAll(() => {
  return testDb.migrate.latest()
})
beforeEach(() => {
  return testDb.seed.run()
})
afterAll(() => {
  testDb.destroy()
})

const test_task_uninvoiced = {
  id: 669,
  description: 'JV approves of writing tests',
  hours: 9001,
  rate: 550,
  client_id: 77,
  invoice_id: null,
}

const test_task_invoiced = {
  id: 670,
  description: 'JV was here',
  hours: 9002,
  rate: 600,
  client_id: 78,
  invoice_id: 13,
}

// const test_data = [test_task_invoiced, test_task_uninvoiced]

// expect('add task where client_id is 77', () => {
//   return db.addTaskByClient
// })
