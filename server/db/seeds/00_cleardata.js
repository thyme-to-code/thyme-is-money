/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  await knex('items').del()
  await knex('invoices').del()
  await knex('clients').del()
  await knex('users').del()
}
