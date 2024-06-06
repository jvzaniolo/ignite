import { createServer } from 'node:http'
import { json } from './middlewares/json.js'
import { routes } from './routes.js'
import { extractQueryParams } from './utils/extract-query-params.js'

const server = createServer(async (req, res) => {
  await json(req, res)

  const route = routes.find(
    (route) => route.method === req.method && route.path.test(req.url)
  )

  if (!route) {
    return res.writeHead(404).end()
  }

  const routeParams = req.url.match(route.path)

  const { query, ...params } = routeParams.groups

  req.params = params
  req.query = query ? extractQueryParams(query) : {}

  return route.handler(req, res)
})

server.listen(3333)
