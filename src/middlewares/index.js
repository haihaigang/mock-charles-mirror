
import useBody from "./body.js"
import useSetting from "./setting.js"
import mockDomain from "./mockDomain.js"
import cors from "./cors.js"
import options from "./options.js"
import logger from "./logger.js"
import time from "./time.js"

export default (app) => {
  app.use(logger)
  app.use(time)

  useBody(app)

  // 一些应用设置
  useSetting(app)

  // 需要确保是第一个中间件，用来识别 mock 数据使用的目录
  app.use(mockDomain)
  app.use(cors)
  app.use(options)
}