
import admin from "./admin.js"
import api from "./api.js"
import domain from "./domain.js"
import staticRoute from "./static.js"

const ROUTE_ADMIN = '/admin'

export default (app) => {
  app.use(ROUTE_ADMIN, admin)
  app.use(ROUTE_ADMIN, domain)
  app.use('/static', staticRoute)
  // api 需要是最后一个路由，因为它会 `*` 通用匹配规则
  app.use(api)
}