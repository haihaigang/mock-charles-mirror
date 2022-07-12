class McmDialogTools extends HTMLElement {
  constructor() {
    super()

    const shadow = this.attachShadow({ mode: 'open' })
    let template = document.getElementById('tpl-mcm-dialog-tools').content
    shadow.appendChild(template.cloneNode(true))
    
    this.container = this.shadowRoot.querySelector('.dialog-tools')
    this.btnDom = this.shadowRoot.querySelector('.dialog-tools-btn')
    this.listDom = this.shadowRoot.querySelector('.dialog-tools-list')

    this.btnDom.addEventListener('click', this.toggle.bind(this))
    document.body.addEventListener('click', this.close.bind(this))
    this.container.addEventListener('click', function(e) {e.stopPropagation()})
    this.listDom.addEventListener('click', this.actionClick.bind(this))
  }

  toggle() {
    if (this.btnDom.classList.contains('on')) {
      this.close()
    } else {
      this.open()
    }
  }

  open() {
    this.btnDom.classList.add('on')
    this.listDom.style.display = 'block'
  }

  close() {
    this.btnDom.classList.remove('on')
    this.listDom.style.display = 'none'
  }

  actionClick(e) {
    let action = e.target.dataset.action
    if (!action) return true
    e.preventDefault()

    switch (action) {
      case 'add-domain':
        document.querySelector('#domain-add').open()
        break
      case 'open-domain':
        openDomain()
        break
      case 'toggle-forward-status':
        this.toggleForwardStatus(e.target)
        break
      default:
        break
    }
  }

  toggleForwardStatus(target) {
    $.ajax({
      url: '/config/toggleForwardOpen',
      type: 'POST'
    }).then(function (res) {
      target.innerText = res ? '关闭转发' : '开启转发'
    })
  }
}

customElements.define('mcm-dialog-tools', McmDialogTools)