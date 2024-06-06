import fastify from 'fastify'
import fastifyCookie from '@fastify/cookie'

import { transactionRoutes } from './routes/transactions.js'

let app = fastify()

app.register(fastifyCookie)
app.register(transactionRoutes)

export { app }
