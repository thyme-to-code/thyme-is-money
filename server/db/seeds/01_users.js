/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  await knex('users').insert([
    {
      first_name: 'Jason',
      last_name: 'Beam',
      email: 'jason@skynet.com',
    },
  ])
}
