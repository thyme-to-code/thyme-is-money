/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  await knex('invoices').del()
  await knex('invoices').insert([
    {
      id: 1,
      user_id: '1',
      client_id: 5,
      total: 1243.15,
      date_sent: '2022-01-21 02:52:53',
      date_paid: '2022-02-18 12:21:30',
      amount_paid: 1243.15,
      json: '',
    },
    {
      id: 2,
      user_id: '1',
      client_id: 1,
      total: 788.9,
      date_sent: '2022-03-03 04:06:08',
      date_paid: null,
      amount_paid: null,
      json: '',
    },
    {
      id: 3,
      user_id: '1',
      client_id: 1,
      total: 289.8,
      date_sent: '2021-08-08 04:06:08',
      date_paid: '2021-08-08 04:06:08',
      amount_paid: 280,
      json: '',
    },
  ])
}
