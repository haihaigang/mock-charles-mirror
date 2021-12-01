export default function(req, res, next) {
  const { origin } = new URL(req.headers.referer)
  res.append('Access-Control-Allow-Origin', origin)
  res.append('Access-Control-Allow-Credentials', true)
  res.append('Access-Control-Allow-Methods', "*")
  res.append('Access-Control-Allow-Headers', "Origin, X-Requested-With, Content-Type, Accept, X-HTTP-Method-Override, Cookie, X-Token, X-Device, X-Plt, X-Ver, X-Page-Id, X-Chl, X-Feature, X-Tag, X-Tk, X-Epid, X-App, X-Os, X-Mock-Domain")

  next();
}