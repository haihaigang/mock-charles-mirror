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
    this.btnDom.addEventListener('click', this.show.bind(this))
    
    this.formDom = this.shadowRoot.querySelector('form')
    let formAction = this.getAttribute('data-action')
    this.formDom.setAttribute('action', formAction)
    this.formDom.addEventListener('submit', this.onSubmit.bind(this))

    console.log(this.formDom.children)
    // this.shadowRoot.querySelector('input')
    //   .addEventListener('keyup', this.onKeyup.bind(this))
    // this.shadowRoot.querySelector('input').addEventListener('blur', this.close.bind(this))
  }

  show(e) {
    e.preventDefault()
    this.formDom.style.display = 'block'
    console.log(this.formDom.querySelector('slot'))
    // this.shadowRoot.querySelector('input').focus()
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

    let formData = getFormData($(this.formDom))
    console.log(formData)

    if (!formData.url) return

    return $.ajax({
      url: $(this).attr('action'),
      data: formData,
      method: 'post'
    }).then(function (res) {
      location.reload()
    })
  }
}

customElements.define('mcm-btn-add', McmBtnAdd)

function getFormData ($form) {
  let formArray = $form.serializeArray();
  let result = {};
  formArray.forEach((item) => {
    result[item.name] = item.value;
  });
  return result;
}