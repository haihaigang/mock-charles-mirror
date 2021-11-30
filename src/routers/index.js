
import admin from "./admin.js"
import api from "./api.js"

const ROUTE_ADMIN = '/admin'

export default (app) => {
  app.use(ROUTE_ADMIN, admin)
  // api 需要时最后一个路由
  app.use(api)
}