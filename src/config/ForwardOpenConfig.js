let state = false

export default {
  isOpen() {
    return state
  },

  open() {
    state = true
  },

  close() {
    state = false
  }
}