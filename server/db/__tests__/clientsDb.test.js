const config = require('../knexfile')
const knex = require('knex')
const testDb = knex(config.test)

const db = require('../clients')

beforeAll(() => {
  return testDb.migrate.latest()
})
beforeEach(() => {
  return testDb.seed.run()
})
afterAll(() => {
  testDb.destroy()
})

const fakeAddClient = {
  business_name: 'Shand Limited',
  contact_name: 'Adam',
  email: 'adam@shand.com',
  phone: '021 499 999',
  address: '64 MacBeth Lane, Torture, Maryland',
  rate: 66,
  isActive: true,
}

const fakeUpdateClient = {
  id: 5,
  ...fakeAddClient,
}

describe('getClients()', () => {
  test('returns 10 items, item[5] has rate of 91', () => {
    expect.assertions(2)
    return db.getClients('', testDb).then((clients) => {
      expect(clients).toHaveLength(10)
      expect(clients[5].rate).toBe(91)
    })
  })
  test('returns one item with', () => {
    expect.assertions(1)
    return db.getClients(3, testDb).then((client) => {
      expect(client.contact_name).toBe('Sarah Grayson')
    })
  })
})

describe('addClient()', () => {
  test('add a fakeClient and check returned id', () => {
    expect.assertions(1)
    return db.addClient(fakeAddClient, testDb).then((client) => {
      expect(client.id).toBe(11)
    })
  })
})

describe('updateClient()', () => {
  test('add a fakeClient and check returned id', () => {
    expect.assertions(1)
    return db.updateClient(fakeUpdateClient, testDb).then((client) => {
      expect(client.contact_name).toBe('Adam')
    })
  })
})
