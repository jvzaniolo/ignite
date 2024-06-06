import { randomUUID } from 'node:crypto'
import { Database } from './db.js'
import { routePath } from './utils/route-path.js'

const db = new Database()

export const routes = [
  {
    method: 'GET',
    path: routePath('/users'),
    handler(req, res) {
      const { search } = req.query

      const users = db.select(
        'users',
        search
          ? {
              name: search,
              email: search,
            }
          : null
      )

      return res.end(JSON.stringify(users))
    },
  },
  {
    method: 'POST',
    path: routePath('/users'),
    handler(req, res) {
      const { name, email } = req.body

      const user = {
        id: randomUUID(),
        name,
        email,
      }

      db.insert('users', user)

      return res.writeHead(201).end()
    },
  },
  {
    method: 'PUT',
    path: routePath('/users/:id'),
    handler(req, res) {
      const userId = req.params.id
      const { name, email } = req.body

      db.update('users', userId, { name, email })

      return res.writeHead(204).end()
    },
  },
  {
    method: 'DELETE',
    path: routePath('/users/:id'),
    handler(req, res) {
      const userId = req.params.id

      db.delete('users', userId)

      return res.writeHead(204).end()
    },
  },
]
