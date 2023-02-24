class PrettyButton extends HTMLElement {
  constructor() {
    super();
    this.setAttribute('role', 'button');
  }

  render() {
    this.innerHTML = `${this.getAttribute('label')}`;
    this.style.width = '100px';
    this.style.fontSize = "0.9rem";
    this.style.lineHeight = "0.9rem";
    this.style.textAlign = "center";
    this.style.fontWeight = "bold";
    this.style.borderRadius = "5px";
    this.style.cursor = "pointer";
    this.style.padding = "0.4rem";
    this.style.paddingTop = "0.6rem";
    this.style.paddingBottom = "0.6rem";

    this.style.boxShadow = "0 3px 5px 0";
    this.style.backgroundColor = "rgb(52, 86, 139)";
    this.style.color = "white";

    // this.style.border = "2px solid rgb(52, 86, 139)";
    // this.style.color = "rgb(52, 86, 139)";
  }

  connectedCallback() {
    if (!this.rendered) {
      this.render();
      this.rendered = true;
    }
  }
}

customElements.define("p-button", PrettyButton);
