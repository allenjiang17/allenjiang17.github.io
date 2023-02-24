class DropDown extends HTMLElement {
  constructor() {
    super();
    this.setAttribute('role', 'select');
    this.selected = this.getAttribute('selected');
    this.dropped = false;
  }

  render() {
    this.innerHTML = `
<a href="#">Select</a>
<ul style="list-style-type:none;display:none">
</ul>
    `;
    let optList = [];
    for (const attr of this.attributes) {
      if(!attr.name.startsWith("option")) { continue; }
      addOpt(attr.val, attr.val);
    }
    this.children[0].addEventListener("click", dropDown)
  }

  addOpt(n, v) {
    let opthtml = `
<li>${n}</li>
    `;
    this.children[1].insertAdjacentHTML("beforeend", opthtml);
  }

  dropDown() {
    if(this.dropped) {
    } else {
    }
  }

  select(ind, val) {
    this.selected = ind;
    this.value = val;
  }

  connectedCallback() {
    if (!this.rendered) {
      this.render();
      this.rendered = true;
    }
  }
}

customElements.define("drop-down", DropDown);
