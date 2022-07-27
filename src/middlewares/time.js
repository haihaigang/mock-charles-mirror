export default function time(req, res, next) {
  const start = Date.now()
  next()
  res.locals.useTime = Date.now() - start
}