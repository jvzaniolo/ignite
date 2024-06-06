import { Knex } from 'knex'

declare module 'knex/types/tables.js' {
  interface Transaction {
    id: string
    title: string
    amount: number
    session_id?: string
    created_at: string
  }

  export interface Tables {
    transactions: Transaction
  }
}
