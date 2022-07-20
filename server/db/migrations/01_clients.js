/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable('clients', (t) => {
    t.increments('id').primary()
    t.string('business_name')
    t.string('contact_name')
    t.string('email')
    t.string('phone')
    t.text('address')
    t.float('rate')
    t.boolean('isActive')
    t.timestamps()
  })
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable('clients')
}
