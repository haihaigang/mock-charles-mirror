let reg_mock = /__mock__/i
function isFromMock(url, params) {
  return reg_mock.test(url) || (params && reg_mock.test(params.body)) || reg_mock.test(location.search)
}

export default function injectFetch(fetch, mockHost = '127.0.0.1:3007') {
  let _fetch = fetch
  fetch = function (url, params) {
    if (isFromMock(url, params)) {
      let domains = /^https?:\/\/(.+?)\/.*/.exec(url)
      if (domains) {
        let domain = domains[1]
        url = url.replace(domain, mockHost)
        params.headers['x-mock-domain'] = domain
      }
    }

    return _fetch(url, params)
  }
  
  return fetch
}
