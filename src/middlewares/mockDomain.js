
/**
 * 获取访问 mock 数据的域名，分别从 请求头 > 域名 > 默认
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
export default function(req, res, next) {
  let domain = req.hostname
  if (req.headers['x-mock-domain']) {
    domain = req.headers['x-mock-domain']
  }
  if (checkValidatedDomain(domain)) {
    res.locals.mockDomain = domain
  } else {
    res.locals.mockDomain = 'api-qa.shouwuapp.com'
  }

  function checkValidatedDomain(domain) {
    if (!domain || !/.*\.[-a-zA-Z0-9]{0,63}\.[-a-zA-Z0-9]{0,63}$/.test(domain)) {
      return false
    }

    if (/^\d+\.\d+\.\d+\.\d+$/.test(domain)) {
      return false
    }

    return true
  }

  next()
}