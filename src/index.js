import Express from "express";
import process from "process";

import initMiddlewares from './middlewares/index.js'
import initRouter from './routers/index.js'

function start() {
  const app = new Express();
  initMiddlewares(app)
  initRouter(app)

  const PORT = process.env.PORT;
  app.listen(PORT, () => {
    console.log(`${process.env.name} server listen on ${PORT}`);
  });
}

start()