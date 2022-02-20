import Component from '../lib/component.js';
import store from '../store/index.js';

export default class PreviewDisplay extends Component {

    constructor() {
        super({store, element: document.querySelector('.previewdisplay')}); 
    }

    render() {
        let self = this;

        self.element.innerHTML = `
            <p>${store.state.prevlyric}</p>
        `;
    }
};
