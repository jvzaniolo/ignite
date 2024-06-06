import { execSync } from 'node:child_process'
import { afterAll, beforeAll, beforeEach, describe, expect, it } from 'vitest'
import supertest from 'supertest'

import { app } from '../src/app.js'

describe('Transactions routes', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  beforeEach(() => {
    execSync('npm run knex migrate:rollback --all')
    execSync('npm run knex migrate:latest')
  })

  it('should create a new transaction', async () => {
    let res = await supertest(app.server).post('/transactions').send({
      title: 'new transaction',
      amount: 5000,
      type: 'credit',
    })

    expect(res.statusCode).toEqual(201)
  })

  it('should list all transactions', async () => {
    let createTransactionResponse = await supertest(app.server)
      .post('/transactions')
      .send({
        title: 'new transaction',
        amount: 5000,
        type: 'credit',
      })

    let cookies = createTransactionResponse.get('Set-Cookie')

    let res = await supertest(app.server)
      .get('/transactions')
      .set('Cookie', cookies)

    expect(res.statusCode).toEqual(200)
    expect(res.body).toEqual({
      transactions: [
        expect.objectContaining({
          title: 'new transaction',
          amount: 5000,
        }),
      ],
    })
  })

  it('should list an specific transaction', async () => {
    let createResponse = await supertest(app.server)
      .post('/transactions')
      .send({
        title: 'new transaction',
        amount: 5000,
        type: 'credit',
      })

    let cookies = createResponse.get('Set-Cookie')

    let listAllResponse = await supertest(app.server)
      .get('/transactions')
      .set('Cookie', cookies)

    let transactionId = listAllResponse.body.transactions[0].id

    let res = await supertest(app.server)
      .get(`/transactions/${transactionId}`)
      .set('Cookie', cookies)

    expect(res.statusCode).toEqual(200)
    expect(res.body).toEqual({
      transaction: expect.objectContaining({
        title: 'new transaction',
        amount: 5000,
      }),
    })
  })

  it('should get summary', async () => {
    let createTransactionResponse = await supertest(app.server)
      .post('/transactions')
      .send({
        title: 'new transaction',
        amount: 5000,
        type: 'credit',
      })

    let cookies = createTransactionResponse.get('Set-Cookie')

    await supertest(app.server)
      .post('/transactions')
      .set('Cookie', cookies)
      .send({
        title: 'new debit transaction',
        amount: 2000,
        type: 'debit',
      })

    let res = await supertest(app.server)
      .get('/transactions/summary')
      .set('Cookie', cookies)

    expect(res.statusCode).toEqual(200)
    expect(res.body).toEqual({
      summary: expect.objectContaining({
        amount: 3000,
      }),
    })
  })
})
