class McmBtnAdd extends HTMLElement {
  constructor() {
    super()

    const shadow = this.attachShadow({ mode: 'open' })
    let template = document.getElementById('tpl-mcm-btn-add').content
    shadow.appendChild(template.cloneNode(true))

    this.btnDom = this.shadowRoot.querySelector('.btn')
    let btnText = this.getAttribute('btn-text')
    let btnTitle = this.getAttribute('btn-title')
    this.btnDom.textContent = btnText
    this.btnDom.setAttribute('title', btnTitle)
    this.btnDom.addEventListener('click', this.open.bind(this))
    
    this.formDom = this.shadowRoot.querySelector('form')
    let formAction = this.getAttribute('data-action')
    this.formDom.setAttribute('action', formAction)
    this.formDom.addEventListener('submit', this.onSubmit.bind(this))

    let dataPlaceholder = this.getAttribute('data-placeholder')
    this.inputDom = this.formDom.querySelector('input[name="url"]')
    this.inputDom.setAttribute('placeholder', dataPlaceholder)
    this.inputDom.addEventListener('keyup', this.onKeyup.bind(this))
    this.inputDom.addEventListener('blur', this.close.bind(this))

    let dataOtherName = this.getAttribute('data-other-name')
    let dataOtherValue = this.getAttribute('data-other-value')
    this.formDom.appendChild(createHiddenInput(dataOtherName, dataOtherValue))
  }

  open(e) {
    e.preventDefault()
    this.formDom.style.display = 'block'
    this.inputDom.focus()
    this.btnDom.style.display = 'none'
  }

  close() {
    this.formDom.style.display = 'none'
    this.btnDom.style.display = 'block'
  }

  onKeyup(e) {
    if (e.keyCode === 27) {
      this.close()
    }
  }

  onSubmit(e) {
    e.preventDefault()

    let onSubmitFn = this.getAttribute('onsubmit')
    if (onSubmitFn && window[onSubmitFn]) {
      window[onSubmitFn](this.formDom)
      return
    }
  }
}

customElements.define('mcm-btn-add', McmBtnAdd)

function createHiddenInput(name, value) {
  let dom = document.createElement('input')
  dom.setAttribute('type', 'hidden')
  dom.setAttribute('name', name)
  dom.setAttribute('value', value)
  return dom
}