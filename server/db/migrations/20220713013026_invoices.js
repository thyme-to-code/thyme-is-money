/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable('invoices', (t) => {
    t.increments('id').primary()
    t.integer('client_id').references('clients.id')
    t.float('total')
    t.datetime('date_sent')
    t.datetime('date_paid')
    t.float('amount_paid')
    t.timestamps()
  })
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable('invoices')
}
