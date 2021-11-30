
export default function(req, res, next) {
  if (req.method === 'OPTIONS') {
    return res.status(200).end('ok')
  }

  next();
}