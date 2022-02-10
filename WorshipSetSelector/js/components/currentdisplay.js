import Component from '../lib/component.js';
import store from '../store/index.js';

export default class CurrentDisplay extends Component {

    constructor() {
        super({store, element: document.querySelector('.currentdisplay')}); 
    }

    render() {
        let self = this;

        self.element.innerHTML = `
            <p>Hello World</p>
        `;

        // It might be silly to control the presentation from the current display,
        // but I'll move this into a separate module/component later
        if(store.state.presentwindow !== null) {
            store.state.presentwindow.document.documentElement.innerHTML = `
                <p>Hello World</p>
            `
        }

    }
};
