/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  await knex('users').del()
  await knex('users').insert([
    {
      id: 1,
      first_name: 'Jason',
      last_name: 'Beam',
      email: 'jason@skynet.com',
    },
  ])
}
