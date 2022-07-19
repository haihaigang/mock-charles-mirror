export default function log(req, res, next) {
  next()
  console.log(req.method, req.originalUrl, req.query, req.body, res.locals.useTime)
}