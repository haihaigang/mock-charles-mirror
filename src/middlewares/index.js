
import useBody from "./body.js"
import useSetting from "./setting.js"
import mockDomain from "./mockDomain.js"
import cors from "./cors.js"
import options from "./options.js"

export default (app) => {

  useBody(app)

  // 一些应用设置
  useSetting(app)

  // 需要确保是第一个中间件，用来识别 mock 数据使用的目录
  app.use(mockDomain)
  app.use(cors)
  app.use(options)
}