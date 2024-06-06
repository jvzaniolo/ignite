import './env'
import { app } from './app.js'
import { env } from './env'

app.listen(
  {
    port: Number(env.PORT),
  },
  (err, address) => {
    if (err) {
      console.log(err)
      process.exit(1)
    }
    console.log(`🚀 Server running at ${address}`)
  }
)
