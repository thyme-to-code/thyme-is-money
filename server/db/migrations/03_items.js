/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable('items', (t) => {
    t.increments('id').primary()
    t.integer('user_id').references('users.id')
    t.integer('client_id').references('clients.id')
    t.integer('invoice_id').references('invoices.id')
    t.tinyint('type', 2).notNullable()
    t.string('description')
    t.float('quantity')
    t.float('cost')
    t.timestamps()
  })
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable('items')
}
