/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  await knex('tasks').del()
  await knex('tasks').insert([
    {
      id: 1,
      description: 'Planning session with Stewart',
      hours: 7,
      rate: null,
      status: 'uninvoiced',
      client_id: 4,
      invoice_id: null,
    },
    {
      id: 2,
      description: 'Inital phone call',
      hours: 1,
      rate: null,
      status: 'uninvoiced',
      client_id: 5,
      invoice_id: 1,
    },
    {
      id: 3,
      description: 'Drafting landscape proposal for the council',
      hours: 4,
      rate: null,
      status: 'uninvoiced',
      client_id: 4,
      invoice_id: null,
    },
    {
      id: 4,
      description: 'Acquisition overview',
      hours: 2,
      rate: null,
      status: 'uninvoiced',
      client_id: 1,
      invoice_id: 2,
    },
    {
      id: 5,
      description: 'Recipe run through with head chef',
      hours: 4,
      rate: null,
      status: 'uninvoiced',
      client_id: 2,
      invoice_id: null,
    },
    {
      id: 6,
      description: 'Meeting with lawyers including prep',
      hours: 5,
      rate: null,
      status: 'uninvoiced',
      client_id: 1,
      invoice_id: 2,
    },
    {
      id: 7,
      description: 'Terrapene carolina',
      hours: 1,
      rate: null,
      status: null,
      client_id: 4,
      invoice_id: null,
    },
    {
      id: 8,
      description: 'Cercopithecus aethiops',
      hours: 3,
      rate: null,
      status: 'uninvoiced',
      client_id: 5,
      invoice_id: 1,
    },
    {
      id: 9,
      description: 'Nucifraga columbiana',
      hours: 2,
      rate: 64.3,
      status: null,
      client_id: 4,
      invoice_id: null,
    },
    {
      id: 10,
      description: 'Ratufa indica',
      hours: 6,
      rate: null,
      status: 'uninvoiced',
      client_id: 2,
      invoice_id: null,
    },
    {
      id: 11,
      description: 'Cervus duvauceli',
      hours: 1,
      rate: null,
      status: 'uninvoiced',
      client_id: 3,
      invoice_id: null,
    },
    {
      id: 12,
      description: 'Phoenicopterus chilensis',
      hours: 5,
      rate: null,
      status: null,
      client_id: 4,
      invoice_id: null,
    },
    {
      id: 13,
      description: 'Phascolarctos cinereus',
      hours: 7,
      rate: null,
      status: null,
      client_id: 4,
      invoice_id: null,
    },
    {
      id: 14,
      description: 'Uraeginthus granatina',
      hours: 3,
      rate: null,
      status: 'uninvoiced',
      client_id: 2,
      invoice_id: null,
    },
    {
      id: 15,
      description: 'Ara ararauna',
      hours: 7,
      rate: 49.0,
      status: null,
      client_id: 3,
      invoice_id: null,
    },
    {
      id: 16,
      description: 'Rhabdomys pumilio',
      hours: 2,
      rate: null,
      status: 'uninvoiced',
      client_id: 1,
      invoice_id: null,
    },
    {
      id: 17,
      description: 'Proteles cristatus',
      hours: 7,
      rate: null,
      status: 'uninvoiced',
      client_id: 1,
      invoice_id: 2,
    },
    {
      id: 18,
      description: 'Thalasseus maximus',
      hours: 3,
      rate: null,
      status: 'uninvoiced',
      client_id: 3,
      invoice_id: null,
    },
    {
      id: 19,
      description: 'Paraxerus cepapi',
      hours: 5,
      rate: null,
      status: 'uninvoiced',
      client_id: 4,
      invoice_id: null,
    },
    {
      id: 20,
      description: 'Pteropus rufus',
      hours: 1,
      rate: 49.5,
      status: 'uninvoiced',
      client_id: 1,
      invoice_id: null,
    },
    {
      id: 21,
      description: 'Spermophilus tridecemlineatus',
      hours: 2,
      rate: 42.2,
      status: null,
      client_id: 4,
      invoice_id: null,
    },
    {
      id: 22,
      description: 'Varanus sp.',
      hours: 6,
      rate: null,
      status: 'uninvoiced',
      client_id: 1,
      invoice_id: null,
    },
    {
      id: 23,
      description: 'Paradoxurus hermaphroditus',
      hours: 2,
      rate: 41.6,
      status: null,
      client_id: 5,
      invoice_id: null,
    },
    {
      id: 24,
      description: 'Spizaetus coronatus',
      hours: 4,
      rate: 60.8,
      status: 'uninvoiced',
      client_id: 3,
      invoice_id: null,
    },
    {
      id: 25,
      description: 'Macropus robustus',
      hours: 3,
      rate: null,
      status: 'uninvoiced',
      client_id: 4,
      invoice_id: null,
    },
    {
      id: 26,
      description: 'Chlidonias leucopterus',
      hours: 8,
      rate: null,
      status: null,
      client_id: 1,
      invoice_id: null,
    },
    {
      id: 27,
      description: 'Egretta thula',
      hours: 6,
      rate: 37.3,
      status: 'uninvoiced',
      client_id: 5,
      invoice_id: null,
    },
    {
      id: 28,
      description: 'Bettongia penicillata',
      hours: 1,
      rate: null,
      status: null,
      client_id: 2,
      invoice_id: null,
    },
    {
      id: 29,
      description: 'Junonia genoveua',
      hours: 4,
      rate: null,
      status: 'uninvoiced',
      client_id: 1,
      invoice_id: null,
    },
    {
      id: 30,
      description: 'Thamnolaea cinnmomeiventris',
      hours: 3,
      rate: null,
      status: 'uninvoiced',
      client_id: 4,
      invoice_id: null,
    },
    {
      id: 31,
      description: 'Bettongia penicillata',
      hours: 3,
      rate: 41.2,
      status: 'uninvoiced',
      client_id: 4,
      invoice_id: null,
    },
    {
      id: 32,
      description: 'Merops nubicus',
      hours: 3,
      rate: null,
      status: 'uninvoiced',
      client_id: 3,
      invoice_id: 3,
    },
    {
      id: 33,
      description: 'Ara chloroptera',
      hours: 4,
      rate: 53.1,
      status: 'uninvoiced',
      client_id: 2,
      invoice_id: null,
    },
    {
      id: 34,
      description: 'Dendrocygna viduata',
      hours: 6,
      rate: null,
      status: null,
      client_id: 5,
      invoice_id: 1,
    },
    {
      id: 35,
      description: 'Vanessa indica',
      hours: 5,
      rate: null,
      status: 'uninvoiced',
      client_id: 4,
      invoice_id: null,
    },
    {
      id: 36,
      description: 'Loxodonta africana',
      hours: 3,
      rate: null,
      status: 'uninvoiced',
      client_id: 4,
      invoice_id: null,
    },
    {
      id: 37,
      description: 'Lemur catta',
      hours: 4,
      rate: null,
      status: 'uninvoiced',
      client_id: 4,
      invoice_id: null,
    },
    {
      id: 38,
      description: 'Chlamydosaurus kingii',
      hours: 7,
      rate: 70.9,
      status: 'uninvoiced',
      client_id: 2,
      invoice_id: null,
    },
    {
      id: 39,
      description: 'Larus dominicanus',
      hours: 2,
      rate: null,
      status: 'uninvoiced',
      client_id: 2,
      invoice_id: null,
    },
    {
      id: 40,
      description: 'Ceryle rudis',
      hours: 1,
      rate: null,
      status: 'uninvoiced',
      client_id: 2,
      invoice_id: null,
    },
    {
      id: 41,
      description: 'Corvus brachyrhynchos',
      hours: 1,
      rate: null,
      status: null,
      client_id: 2,
      invoice_id: null,
    },
    {
      id: 42,
      description: 'Eutamias minimus',
      hours: 3,
      rate: 51.4,
      status: 'uninvoiced',
      client_id: 3,
      invoice_id: null,
    },
    {
      id: 43,
      description: 'Macropus agilis',
      hours: 2,
      rate: null,
      status: null,
      client_id: 4,
      invoice_id: null,
    },
    {
      id: 44,
      description: 'Vulpes vulpes',
      hours: 1,
      rate: null,
      status: null,
      client_id: 5,
      invoice_id: 1,
    },
    {
      id: 45,
      description: 'Snycerus caffer',
      hours: 4,
      rate: null,
      status: null,
      client_id: 1,
      invoice_id: null,
    },
    {
      id: 46,
      description: 'Varanus komodensis',
      hours: 7,
      rate: null,
      status: null,
      client_id: 2,
      invoice_id: null,
    },
    {
      id: 47,
      description: 'Bubo sp.',
      hours: 3,
      rate: null,
      status: null,
      client_id: 3,
      invoice_id: null,
    },
    {
      id: 48,
      description: 'Cabassous sp.',
      hours: 4,
      rate: null,
      status: null,
      client_id: 1,
      invoice_id: null,
    },
    {
      id: 49,
      description: 'Francolinus swainsonii',
      hours: 8,
      rate: null,
      status: null,
      client_id: 4,
      invoice_id: null,
    },
    {
      id: 50,
      description: 'Laniaurius atrococcineus',
      hours: 7,
      rate: null,
      status: null,
      client_id: 5,
      invoice_id: null,
    },
  ])
}
