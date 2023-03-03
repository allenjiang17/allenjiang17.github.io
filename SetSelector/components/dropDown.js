class DropDown extends HTMLElement {
  constructor() {
    super();
    this.setAttribute('role', 'select');
    this.setAttribute("value", this.getAttribute('selected'));
    this.active = false;
  }

  render() {
    this.style.position = "relative";
    this.innerHTML = `
      <dd-label>Select  <img src="../icons/chevron-down.svg"></dd-label>
      <dd-list style="overflow:hidden;height:0;">
      </dd-list>
    `;
    let optList = [];
    for (const attr of this.attributes) {
      if(!attr.name.startsWith("option")) { continue; }
      addOpt(attr.val);
    }
    let ddlabel = this.getElementsByTagName("dd-label").item(0);
    let ddlabelicon = ddlabel.getElementsByTagName("img").item(0);
    let ddlist = this.getElementsByTagName("dd-list").item(0);

    ddlabel.style.backgroundColor = "#f6f6f6";
    ddlabel.style.border = "1px solid #aaa";
    ddlabel.style.borderRadius = "5px";
    ddlabel.style.padding = "4px 7px 4px 7px";
    ddlabel.style.display = "inline-block";
    
    ddlabelicon.style.padding = "0 0 0 12px";
    ddlabelicon.style.height = "0.7rem";

    //ddlist.style. = "";
    ddlabel.addEventListener("click", this.dropDown.bind(this))

    this.select(this.getAttribute('selected'));
  }

  addOpt(v) {
    let opthtml = `
      <dd-li value="${v}">${v}</dd-li>
    `;
    let ddlist = this.getElementsByTagName("dd-list").item(0);
    ddlist.insertAdjacentHTML("beforeend", opthtml);
    ddlist.lastChild.addEventListener("click", this.select(v).bind(this))
  }

  dropDown() {
    if(this.active) {
      this.active = false;
    } else {
      this.active = true;
    }
  }

  select(val) {
    this.setAttribute("value", val)
    this.value = val;
    // add selected class
  }

  connectedCallback() {
    if (!this.rendered) {
      this.render();
      this.rendered = true;
    }
  }
}

customElements.define("drop-down", DropDown);
