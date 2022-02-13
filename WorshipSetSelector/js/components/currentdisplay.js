import Component from '../lib/component.js';
import store from '../store/index.js';

export default class CurrentDisplay extends Component {

    constructor() {
        super({store, element: document.querySelector('.currentdisplay')}); 
    }

    render() {
        let self = this;

        self.element.innerHTML = `
            <p>${store.state.currlyric}</p>
        `;
    }
};
