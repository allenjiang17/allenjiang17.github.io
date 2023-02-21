class PrettyButton extends HTMLElement {
  constructor() {
    super();
    this.addEventListener('click', this.getAttribute("onClick").bind(this));
    this._internals.role = "button"; // ARIA accessibility semantics
    this.innerHTML = `
    `;
  }
}

customElements.define("pbutton", PrettyButton);
