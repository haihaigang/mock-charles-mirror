#!/usr/bin/env node

import Express from 'express'
import { env } from 'process'

import initMiddlewares from './middlewares/index.js'
import initRouter from './routers/index.js'

const { name = 'mock-charles-mirror', PORT = 3007 } = env

function start() {
  const app = new Express()
  initMiddlewares(app)
  initRouter(app)

  app.listen(PORT, () => {
    console.log(`${name} server listen on ${PORT}`)
  })
}

start()
