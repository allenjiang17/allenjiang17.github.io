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
                <body style="margin:0;">
                <div style="width:100%;height:100%;padding-top:2.5%;display:table;background:#000000;color:white; overflow:hidden">
                <p style="text-align:center; display:table-cell; font-size: 3vmin; line-height:1.6">
                    ${store.state.currlyric}
                </p>
                </div>
                </body>
            `
        }
    }
};
