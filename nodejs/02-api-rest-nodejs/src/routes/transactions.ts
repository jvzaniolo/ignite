import type {
  FastifyInstance,
  FastifyReply,
  FastifyRequest,
  HookHandlerDoneFunction,
} from 'fastify'
import { randomUUID } from 'node:crypto'
import { z } from 'zod'
import { db } from '../db.js'

function checkSessionId(
  req: FastifyRequest,
  res: FastifyReply,
  next: HookHandlerDoneFunction
) {
  let sessionId = req.cookies.sessionId

  if (!sessionId) return res.status(401).send({ error: 'Unauthorized' })

  next()
}

export async function transactionRoutes(app: FastifyInstance) {
  app.get(
    '/transactions',
    {
      preHandler: [checkSessionId],
    },
    async (req) => {
      let sessionId = req.cookies['sessionId']
      let transactions = await db('transactions')
        .where({ session_id: sessionId })
        .select()

      return { transactions }
    }
  )

  app.get(
    '/transactions/:id',
    {
      preHandler: [checkSessionId],
    },
    async (req) => {
      let sessionId = req.cookies['sessionId']
      let paramsSchema = z.object({
        id: z.string().uuid(),
      })
      let { id } = paramsSchema.parse(req.params)
      let transaction = await db('transactions')
        .where({ id, session_id: sessionId })
        .first()
      return { transaction }
    }
  )

  app.get(
    '/transactions/summary',
    {
      preHandler: [checkSessionId],
    },
    async (req) => {
      let sessionId = req.cookies['sessionId']
      let summary = await db('transactions')
        .where('session_id', sessionId)
        .sum('amount', {
          as: 'amount',
        })
        .first()

      return { summary }
    }
  )

  app.post('/transactions', async (req, res) => {
    let transactionSchema = z.object({
      title: z.string(),
      amount: z.number(),
      type: z.enum(['credit', 'debit']),
    })

    let { title, amount, type } = transactionSchema.parse(req.body)
    let sessionId = req.cookies['sessionId']

    if (!sessionId) {
      sessionId = randomUUID()

      res.setCookie('sessionId', sessionId, {
        path: '/',
        maxAge: 60 * 60 * 24 * 7, // 7 days in seconds
      })
    }

    await db('transactions').insert({
      id: randomUUID(),
      title,
      amount: type === 'credit' ? amount : amount * -1,
      session_id: sessionId,
    })

    return res.status(201).send()
  })
}
