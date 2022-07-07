
let __domain = 'default'
export default {
  set(domain) {
    __domain = domain
  },
  get() {
    return __domain
  }
}