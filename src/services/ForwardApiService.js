import axios from 'axios'

/**
 * 转发 API 服务，用于将访问的接口按照 mockDomain 转发到远程服务并返回结果
 */
class ForwardApiService {
  constructor(domain, req) {
    this.protocol = req.protocol
    this.domain = domain;
    this.method = req.method
    this.path = req.path;
    this.headers = req.headers;
    this.query = req.query
    this.body = req.body
    this.originalUrl = req.originalUrl

    delete this.headers.host

    // console.log(this)
  }

  async send() {
    try {
      const res = await axios({
        method: this.method,
        baseURL: this.protocol + '://' + this.domain,
        url: this.path,
        headers: this.headers,
        data: this.method.toUpperCase() === 'GET' ? this.query : this.body
      })
      return res.data
    } catch (error) {
      console.error(error)
      if (error.response) {
        return {status: error.response.status, message: error.response.data}
      } else if (error.request) {
        return {status: 500, message: error.message}
      } else {
        return {status: 500, message: error.message}
      }
    }
  }
}

export default ForwardApiService