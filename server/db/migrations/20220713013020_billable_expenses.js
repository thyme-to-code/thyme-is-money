/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable('billable_expenses', (t) => {
    t.increments('id').primary()
    t.string('description')
    t.integer('invoice_id').references('invoices.id')
    t.integer('client_id').references('clients.id')
    t.float('cost')
    t.float('units')
    t.timestamps()
  })
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable('billable_expenses')
}
