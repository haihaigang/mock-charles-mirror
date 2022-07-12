
let __domain = 'api.example.com'
export default {
  set(domain) {
    __domain = domain
  },
  get() {
    return __domain
  }
}