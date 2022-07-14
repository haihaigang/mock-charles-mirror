const viewUrl = new URL('../views', import.meta.url)

export default function useSetting(app) {
  app.set('views', viewUrl.pathname)
  app.set('view engine', 'ejs')
  app.set('x-powered-by', false)
}
