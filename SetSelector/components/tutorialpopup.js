class TutorialPopup extends HTMLElement {
  constructor() { super(); }

  render() {
    this.innerHTML = `
      <popup-background></popup-background>
      <panel-one></panel-one>
      <panel-two></panel-two>
      <panel-three></panel-three>
    `;
    let bkgd = this.getElementsByTagName("popup-background").item(0);
    let p1 = this.getElementsByTagName("panel-one").item(0);
    let p2 = this.getElementsByTagName("panel-two").item(0);
    let p3 = this.getElementsByTagName("panel-three").item(0);
    this.bkgd.addEventListener("click", hide.bind(this));
  }

  connectedCallback() {
    if(!this.rendered) {
      this.render();
      this.rendered = true;
    }
  }

  hide() {
    if(this.style.display == "none") {
      this.style.display == "block";
    } else {
      this.style.display == "none";
    }
  }
}

customElements.define("t-popup", TutorialPopup);
