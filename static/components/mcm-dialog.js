// dom 结构
// ;<div class="mcm-dialog" style="display: none;">
//   <div class="mcm-dialog-mask"/>
//   <div class="mac-dialog-wrapper">
//     <p>新增一个域名</p>
//     <div class="mcm-dialog-content"></div>
//     <form id="form-add-domain" action="/admin/addMockDomain">
//       <input class="form-control" type="text" name="domain" placeholder="输入一个域名名称" autocomplete="off" />
//     </form>
//   </div>
// </div>

// 用法
// <mcm-dialog title="">123</mcm-dialog>


const styleStr = `
.mcm-dialog {
  
}
.mcm-dialog-mask {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1;
  background-color: rgba(0,0,0,0.7);
}
.mcm-dialog-title {
  margin: 0;
  padding-bottom: 10px;
  border-bottom: 1px solid #eee;
  text-align: center;
}
.mcm-dialog-wrapper {
  position: absolute;
  top: 50%;
  right: 50%;
  transform: translate(50%, 50%);
  z-index: 9;
  min-width: 200px;
  max-height: 80vh;
  margin: 0;
  padding: 10px 0;
  border-radius: 10px;
  overflow-y: auto;
  background-color: #fff;
}
`

class McmDialog extends HTMLElement {
  constructor() {
    super()

    const shadow = this.attachShadow({ mode: 'open' })
    let template = document.getElementById('tpl-mcm-dialog').content
    shadow.appendChild(template.cloneNode(true))

    this.shadowRoot.querySelector('.mcm-dialog-close').addEventListener('click', this.close.bind(this))
  }

  open() {
    this.shadowRoot.querySelector('.mcm-dialog-mask').style.display = 'block'
    this.shadowRoot.querySelector('.mcm-dialog-wrapper').style.display = 'block'
    this.style.display = 'block'
  }

  close() {
    this.shadowRoot.querySelector('.mcm-dialog-mask').style.display = 'none'
    this.shadowRoot.querySelector('.mcm-dialog-wrapper').style.display = 'none'
    this.style.display = 'none'
  }
}

customElements.define('mcm-dialog', McmDialog)
