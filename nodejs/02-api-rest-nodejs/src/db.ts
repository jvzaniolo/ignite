import knex, { type Knex } from 'knex'
import { env } from './env'

export let dbConfig: Knex.Config = {
  client: 'sqlite',
  connection: {
    filename: env.DATABASE_URL,
  },
  useNullAsDefault: true,
  migrations: {
    extension: 'ts',
    directory: './db/migrations',
  },
}

export let db = knex(dbConfig)
