
import admin from "./admin.js"
import api from "./api.js"

export default (app) => {
  app.use(admin)
  // api 需要时最后一个路由
  app.use(api)
}