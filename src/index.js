import Express from 'express'
import { env } from 'process'

import initMiddlewares from './middlewares/index.js'
import initRouter from './routers/index.js'

function start() {
  const app = new Express()
  initMiddlewares(app)
  initRouter(app)

  const { name, PORT } = env
  app.listen(PORT, () => {
    console.log(`${name} server listen on ${PORT}`)
  })
}

start()
