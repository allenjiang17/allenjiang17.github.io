import Component from '../lib/component.js';
import store from '../store/index.js';

export default class PresentButton extends Component {

    constructor() {
        super({store, element: document.querySelector('.presentbutton')}); 
    }

    render() {
        let self = this;

        if(store.state.presentwindow !== null) {
            self.element.innerHTML = `
                <button class="btn btn-primary pb btn-lg" disabled>
                    Present
                </button>
            `;
            return;
        }
        self.element.innerHTML = `
            <button class="btn btn-primary pb btn-lg">Present</button>
        `;

        document.querySelector('.pb').addEventListener('click', () => {
            console.log('presenting!')
            window.open("", "worshippresentationwindow", 
                "menubar=no,toolbar=no,location=no,status=no,resizeable=no")
        });
    }
};
