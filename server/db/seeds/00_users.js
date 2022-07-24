/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  await knex('clients').del()
  await knex('clients').insert([
    {
      id: 1,
      user_id: '1',
      first_name: 'Jason',
      last_name: 'Beam',
      email: 'jason@skynet.com',
    },
  ])
}
