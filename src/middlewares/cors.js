export default function(req, res, next) {
  res.append('access-control-allow-origin', "*")
  res.append('access-control-allow-credentials', true)
  res.append('access-control-allow-headers', "*")

  next();
}