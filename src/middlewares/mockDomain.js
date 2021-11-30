export default function(req, res, next) {
  if (checkValidatedDomain(req.hostname)) {
    res.locals.mockDomain = req.hostname
  } else {
    res.locals.mockDomain = 'default'
    res.locals.mockDomain = 'api-qa.shouwuapp.com'
  }

  function checkValidatedDomain(domain) {
    if (!domain || !/.*\.[-a-zA-Z0-9]{0,63}\.[-a-zA-Z0-9]{0,63}$/.test(domain)) {
      return false
    }

    return true
  }

  next()
}