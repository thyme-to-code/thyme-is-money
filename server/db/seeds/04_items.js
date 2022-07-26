/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  await knex('items').insert([
    {
      description: 'Initial meeting with Jason',
      quantity: 2,
      cost: null,
      type: 1,
      client_id: 1,
      invoice_id: null,
    },
    {
      description: 'Discussed Jatby fund raise with VC',
      quantity: 1,
      cost: null,
      type: 1,
      client_id: 1,
      invoice_id: 1,
    },
    {
      description: 'Lunch with Skynet team',
      quantity: 2,
      cost: null,
      type: 1,
      client_id: 1,
      invoice_id: null,
    },
    {
      description: 'Draft slide deck, including review with Jason',
      quantity: 5,
      cost: null,
      type: 1,
      client_id: 1,
      invoice_id: 2,
    },
    {
      description: 'Initial meeting with Melissa and head chef',
      quantity: 4,
      cost: null,
      type: 1,
      client_id: 2,
      invoice_id: null,
    },
    {
      description: 'Design front of shop brand logos',
      quantity: 5,
      cost: null,
      type: 1,
      client_id: 2,
      invoice_id: 2,
    },
    {
      description: 'Second cut of brand logos with Melissa',
      quantity: 1,
      cost: null,
      type: 1,
      client_id: 2,
      invoice_id: null,
    },
    {
      description: 'Liase with printing shop and deliver signage',
      quantity: 3,
      cost: null,
      type: 1,
      client_id: 2,
      invoice_id: 1,
    },
    {
      description: 'Zoom meeting with Sarah to discuss proposal',
      quantity: 2,
      cost: 64.3,
      type: 1,
      client_id: 3,
      invoice_id: null,
    },
    {
      description: 'CAD design for bridge supports',
      quantity: 6,
      cost: null,
      type: 1,
      client_id: 3,
      invoice_id: null,
    },
    {
      description: 'Zoom meeting with head of construction',
      quantity: 1,
      cost: null,
      type: 1,
      client_id: 3,
      invoice_id: null,
    },
    {
      description: 'On-site to supervise bridge suppport installation',
      quantity: 5,
      cost: null,
      type: 1,
      client_id: 3,
      invoice_id: null,
    },
    {
      description: 'Finalise engineering report',
      quantity: 7,
      cost: null,
      type: 1,
      client_id: 3,
      invoice_id: null,
    },
    {
      description: 'Panelbeat front left guard of Stewarts Ferrari',
      quantity: 3,
      cost: null,
      type: 1,
      client_id: 4,
      invoice_id: null,
    },
    {
      description: 'Run diagnostic testing. Update ECU firmware',
      quantity: 2,
      cost: 49.0,
      type: 1,
      client_id: 4,
      invoice_id: null,
    },
    {
      description: 'Fit and balance new Pirelli tyres',
      quantity: 2,
      cost: null,
      type: 1,
      client_id: 4,
      invoice_id: null,
    },
    {
      description: 'Wheel alignment',
      quantity: 0.5,
      cost: null,
      type: 1,
      client_id: 4,
      invoice_id: 2,
    },
    {
      description: 'Clean and detail including ceramic coating',
      quantity: 3,
      cost: null,
      type: 1,
      client_id: 4,
      invoice_id: null,
    },
    {
      description: 'Interior detail. Work completed by Lorenz',
      quantity: 5,
      cost: null,
      type: 1,
      client_id: 4,
      invoice_id: null,
    },
    {
      description: 'Office clean work completed at 7:00pm',
      quantity: 1,
      cost: 49.5,
      type: 1,
      client_id: 5,
      invoice_id: null,
    },
    {
      description: 'Office clean work completed at 7:30pm',
      quantity: 1,
      cost: 42.2,
      type: 1,
      client_id: 5,
      invoice_id: null,
    },
    {
      description: 'Office clean work completed at 7:15pm',
      quantity: 2,
      cost: null,
      type: 1,
      client_id: 5,
      invoice_id: null,
    },
    {
      description: 'Office clean work completed at 6:55pm',
      quantity: 1,
      cost: 41.6,
      type: 1,
      client_id: 5,
      invoice_id: null,
    },
    {
      description: 'Office clean work completed at 7:35pm',
      quantity: 1.5,
      cost: 60.8,
      type: 1,
      client_id: 5,
      invoice_id: null,
    },
    {
      description: 'Office clean work completed at 7:45pm',
      quantity: 1.5,
      cost: null,
      type: 1,
      client_id: 5,
      invoice_id: null,
    },
    {
      description: 'Office clean work completed at 8:30pm',
      quantity: 2,
      cost: null,
      type: 1,
      client_id: 5,
      invoice_id: null,
    },
    {
      description: 'Initial consult with Maya with tour of factory',
      quantity: 4,
      cost: null,
      type: 1,
      client_id: 6,
      invoice_id: null,
    },
    {
      description: 'Mock up of custom furniture for Mayas client',
      quantity: 3,
      cost: null,
      type: 1,
      client_id: 6,
      invoice_id: null,
    },
    {
      description: 'Proposal sent and discussed with Maya',
      quantity: 3,
      cost: 41.2,
      type: 1,
      client_id: 6,
      invoice_id: null,
    },
    {
      description: 'Two cabinets built and finished',
      quantity: 5,
      cost: null,
      type: 1,
      client_id: 6,
      invoice_id: 3,
    },
    {
      description: 'Dining table and six chairs complete',
      quantity: 4,
      cost: 53.1,
      type: 1,
      client_id: 6,
      invoice_id: null,
    },
    {
      description: 'Valve seals replaces in Sarahs Suzuki Swift',
      quantity: 5,
      cost: null,
      type: 1,
      client_id: 7,
      invoice_id: null,
    },
    {
      description: 'Rear windscreen replaced for Harrys Silvia',
      quantity: 3,
      cost: null,
      type: 1,
      client_id: 7,
      invoice_id: null,
    },
    {
      description: 'General service on Garys Toyota Prius',
      quantity: 4,
      cost: null,
      type: 1,
      client_id: 7,
      invoice_id: null,
    },
    {
      description: 'Replace rear wheel bearings on Yuris BMW 3-series',
      quantity: 7,
      cost: 70.9,
      type: 1,
      client_id: 7,
      invoice_id: null,
    },
    {
      description: 'Courier security equipment for Penelope order #4134',
      quantity: 2,
      cost: null,
      type: 1,
      client_id: 8,
      invoice_id: null,
    },
    {
      description: 'Courier delivery for order #4123',
      quantity: 1,
      cost: null,
      type: 1,
      client_id: 8,
      invoice_id: null,
    },
    {
      description: 'Courier delivery for order #4124',
      quantity: 1,
      cost: null,
      type: 1,
      client_id: 8,
      invoice_id: null,
    },
    {
      description: 'Courier delivery for order #4126',
      quantity: 3,
      cost: 51.4,
      type: 1,
      client_id: 8,
      invoice_id: null,
    },
    {
      description: 'Courier delivery for order #4127',
      quantity: 2,
      cost: null,
      type: 1,
      client_id: 8,
      invoice_id: null,
    },
    {
      description: 'Courier delivery for order #4130',
      quantity: 1,
      cost: null,
      type: 1,
      client_id: 8,
      invoice_id: 1,
    },
    {
      description: 'Order of 10kg of mince | 5kg of mushrooms | 50kg of flour',
      quantity: 7,
      cost: null,
      type: 1,
      client_id: 9,
      invoice_id: null,
    },
    {
      description:
        'Order of 12kg of mince | 5kg of potato | 50kg of cool bananas',
      quantity: 3,
      cost: null,
      type: 1,
      client_id: 9,
      invoice_id: null,
    },
    {
      description:
        'Order of 10kg of cool beans | 5kg of mushrooms | 50kg of flour',
      quantity: 4,
      cost: null,
      type: 1,
      client_id: 9,
      invoice_id: null,
    },
    {
      description: 'Special order of 12kg of more cool bananas',
      quantity: 8,
      cost: null,
      type: 1,
      client_id: 9,
      invoice_id: null,
    },
    {
      description: 'Another urgent order for 15kg of cool bananas',
      quantity: 7,
      cost: null,
      type: 1,
      client_id: 9,
      invoice_id: null,
    },
  ])
}
