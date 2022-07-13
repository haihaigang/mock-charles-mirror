(function(window, location){
  let _fetch = window.fetch
  window.fetch = function (url, params) {
    if (isFromMock(url, params)) {
      let domains = /^https?:\/\/(.+?)\/.*/.exec(url)
      if (domains) {
        let domain = domains[1]
        url = url.replace(domain, '127.0.0.1:3007')
        params.headers['x-mock-domain'] = domain
        console.log(['__MOCK__', url])
      }
    }
    
    return _fetch(url, params)
  }
  
  let reg_mock = /__mock__/i
  function isFromMock(url, params) {
    return reg_mock.test(url) || (params && reg_mock.test(params.body)) || reg_mock.test(location.search)
  }
})(window, location)