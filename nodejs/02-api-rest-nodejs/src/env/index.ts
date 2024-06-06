import { config } from 'dotenv'
import { z } from 'zod'

if (process.env.NODE_ENV === 'test') {
  config({ path: '.env.test' })
} else {
  config()
}

let envSchema = z.object({
  NODE_ENV: z.enum(['test', 'development', 'production']),
  PORT: z.string().default('3333'),
  DATABASE_URL: z.string(),
})

export let env = envSchema.parse(process.env)
