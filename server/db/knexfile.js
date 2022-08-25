// @ts-check
const path = require('path')

module.exports = {
  development: {
    client: 'sqlite3',
    connection: {
      filename: path.join(__dirname, 'dev.sqlite3'),
    },
    useNullAsDefault: true,
  },

  test: {
    client: 'sqlite3',
    connection: {
      filename: ':memory:',
    },
    migrations: {
      directory: path.join(__dirname, 'migrations'),
    },
    seeds: {
      directory: path.join(__dirname, 'seeds'),
    },
    useNullAsDefault: true,
  },

  production: {
    client: 'postgresql',
    // connection: process.env.DATABASE_URL,
    connection: {
      database: process.env.DATABASE_NAME || 'thymeismoney',
      user: process.env.POSTGRES_USER || 'thyme',
      password: process.env.POSTGRES_USER_PW || 'testingThyme',
      port: process.env.POSTGRES_PORT || 5432,
      host: process.env.POSTGRES_HOST || '192.168.11.2',
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      tableName: 'knex_migrations',
    },
  },
}
