export default function(req, res, next) {
  let origin = '*'
  if (req.headers.referer) {
    const refUrl = new URL(req.headers.referer)
    origin = refUrl.origin
  }
  res.append('Access-Control-Allow-Origin', origin)
  res.append('Access-Control-Allow-Credentials', true)
  res.append('Access-Control-Allow-Methods', "*")
  res.append('Access-Control-Allow-Headers', "*")

  next();
}