let reg_mock = /__mock__/i
function isFromMock(url, params) {
  return reg_mock.test(url) || (params && reg_mock.test(params.body)) || reg_mock.test(location.search)
}

export default function injectAxios(axios, mockHost = '127.0.0.1:3007') {
  // 请求发出前
  axios.interceptors.request.use(
    cfg => {
      if (isFromMock(cfg.url, cfg.params)) {
        let domains = /^https?:\/\/(.+?)\/.*/.exec(cfg.baseURL)
        if (domains) {
          let domain = domains[1]
          cfg.baseURL = cfg.baseURL.replace(domain, mockHost)
          cfg.headers['x-mock-domain'] = domain
        }
      }

      return cfg
    },
    err => Promise.reject(err)
  )
}