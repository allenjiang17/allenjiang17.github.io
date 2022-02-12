import Component from '../lib/component.js';
import store from '../store/index.js';

export default class Presentation extends Component {

    constructor() {
        super({store}); 
    }

    render() {
        let self = this;

        if(store.state.presentwindow !== null) {
            store.state.presentwindow.document.documentElement.innerHTML = `
                <p>${store.state.currlyric}</p>
            `
        }
    }
};
