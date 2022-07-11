import Request from "./request.js"

class DFDClientService  extends Request {
  constructor(domain, req) {
    super()

    this.domain = domain;
    this.method = req.method
    this.path = req.path;
    this.headers = req.headers;
    this.query = req.query
    this.body = req.body
    
    console.log(this)
    this.send()
  }

  send() {
    return this.axios({
      method: this.method,
      baseURL: '',
      url: this.path,
      headers: this.headers,
      data: this.method.toUpperCase() === 'GET' ? this.query : this.body
    })
  }
}

export default DFDClientService