import faker from 'faker'
import { Factory, Model, Server, Response } from 'miragejs'

type User = {
  name: string
  email: string
  created_at: string
}

export default function makeServer({ environment = 'development' } = {}) {
  return new Server({
    environment,

    models: {
      user: Model.extend<Partial<User>>({}),
    },

    factories: {
      user: Factory.extend({
        name: () => faker.name.firstName(),
        email: () => faker.internet.email().toLowerCase(),
        createdAt: () => faker.date.recent(10),
      }),
    },

    seeds(server) {
      server.createList('user', 200)
    },

    routes() {
      this.timing = 750
      this.namespace = 'api'

      this.get('/users', function (schema, request) {
        const { page = 1, pageSize = 10 } = request.queryParams

        const total = schema.all('user').length

        const pageStart = (Number(page) - 1) * Number(pageSize)
        const pageEnd = pageStart + Number(pageSize)

        const users = this.serialize(schema.all('user')).users.slice(
          pageStart,
          pageEnd
        )

        return new Response(200, { 'X-Total-Users': String(total) }, { users })
      })

      this.post('/users')

      this.namespace = ''
      this.passthrough()
    },
  })
}
