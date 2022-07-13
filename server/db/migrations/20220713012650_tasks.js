/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable('tasks', (t) => {
    t.increments('id').primary()
    t.string('description')
    t.float('hours')
    t.float('rate')
    t.string('status')
    t.integer('client_id').references('clients.id')
    t.integer('invoice_id').references('invoices.id')
    t.timestamps()
  })
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable('tasks')
}
