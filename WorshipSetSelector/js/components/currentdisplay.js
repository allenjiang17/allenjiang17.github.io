import Component from '../lib/component.js';
import store from '../store/index.js';

export default class CurrentDisplay extends Component {

    constructor() {
        super({store, element: document.querySelector('.currentdisplay')}); 
    }

    render() {
        let self = this;

        self.element.innerHTML = `
            <div style="width:100%;padding-top:2.5%;height:100%;display:table;background:#000000;color:white; overflow:hidden">
            <p style="text-align:center;display:table-cell;padding-top:5%;font-size:3vmin;line-height:1.6">
                ${store.state.currlyric}
            </p>
            </div>
        `;
    }
};
