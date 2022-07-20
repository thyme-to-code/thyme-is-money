/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // await knex('expenses').del()
  await knex('expenses').insert([
    {
      id: 1,
      description: 'Atriplex tridentata Kuntze',
      units: 66.4,
      cost: 440.41,
      client_id: 3,
      invoice_id: null,
    },
    {
      id: 2,
      description:
        'Bryum capillare Hedw. var. ferchelii (Brid.) Bruch & Schimp.',
      units: 98.8,
      cost: 690.33,
      client_id: 5,
      invoice_id: null,
    },
    {
      id: 3,
      description: 'Ceanothus greggii A. Gray',
      units: 59.6,
      cost: 602.41,
      client_id: 3,
      invoice_id: null,
    },
    {
      id: 4,
      description: 'Serjania polyphylla (L.) Radlk.',
      units: 67.9,
      cost: 531.18,
      client_id: 1,
      invoice_id: null,
    },
    {
      id: 5,
      description: 'Ardisia escallonoides Schiede & Deppe ex Schltdl. & Cham.',
      units: 70.7,
      cost: 974.96,
      client_id: 3,
      invoice_id: null,
    },
    {
      id: 6,
      description: 'Nerium oleander L.',
      units: 17.3,
      cost: 658.47,
      client_id: 1,
      invoice_id: null,
    },
    {
      id: 7,
      description: 'Camissonia megalantha (Munz) P.H. Raven',
      units: 10.1,
      cost: 52.23,
      client_id: 2,
      invoice_id: null,
    },
    {
      id: 8,
      description: 'Rugelia Shuttlw. ex Chapm.',
      units: 87.0,
      cost: 614.98,
      client_id: 3,
      invoice_id: null,
    },
    {
      id: 9,
      description: 'Torralbasia cuneifolia (C. Wright) Krug & Urb.',
      units: 49.7,
      cost: 806.98,
      client_id: 5,
      invoice_id: null,
    },
    {
      id: 10,
      description: 'Selaginella uncinata (Desv. ex Poir.) Spring',
      units: 93.9,
      cost: 760.16,
      client_id: 2,
      invoice_id: null,
    },
    {
      id: 11,
      description: 'Hypericum mutilum L.',
      units: 92.5,
      cost: 271.45,
      client_id: 5,
      invoice_id: null,
    },
    {
      id: 12,
      description: 'Acrocordia megalospora (Fink) R.C. Harris',
      units: 19.4,
      cost: 256.22,
      client_id: 5,
      invoice_id: null,
    },
    {
      id: 13,
      description: 'Amaranthus blitum L.',
      units: 96.5,
      cost: 370.99,
      client_id: 2,
      invoice_id: null,
    },
    {
      id: 14,
      description: 'Stemodia durantifolia (L.) Sw.',
      units: 24.1,
      cost: 716.36,
      client_id: 5,
      invoice_id: null,
    },
    {
      id: 15,
      description: 'Cirsium scapanolepis Petr.',
      units: 93.9,
      cost: 478.33,
      client_id: 5,
      invoice_id: null,
    },
    {
      id: 16,
      description: 'Carex glaucescens Elliott',
      units: 34.2,
      cost: 145.95,
      client_id: 3,
      invoice_id: null,
    },
    {
      id: 17,
      description: 'Bartonia Muhl. ex Willd.',
      units: 96.5,
      cost: 836.06,
      client_id: 3,
      invoice_id: null,
    },
    {
      id: 18,
      description: 'Brassavola R. Br.',
      units: 90.4,
      cost: 529.58,
      client_id: 5,
      invoice_id: null,
    },
    {
      id: 19,
      description: 'Monstera adansonii Schott',
      units: 44.5,
      cost: 452.01,
      client_id: 2,
      invoice_id: null,
    },
    {
      id: 20,
      description: 'Smilax pulverulenta Michx.',
      units: 1.6,
      cost: 908.02,
      client_id: 1,
      invoice_id: null,
    },
  ])
}
