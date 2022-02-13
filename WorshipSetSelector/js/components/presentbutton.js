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
            let windowobj = window.open("", "worshippresentationwindow", 
                "popup");
            // windowobj.document.documentElement.requestFullscreen();
            //  "menubar=no,toolbar=no,location=no,status=no,resizeable")
            // On firefox, you need to set some stuff in about:config for these
            // to work perfectly;
            //
            // https://stackoverflow.com/questions/2909645/open-new-popup-window-without-address-bars-in-firefox-ie
            // browser.fullscreen.autohide
            // premissions.fullscreen.allowed
            windowobj.onbeforeunload = function() {
                store.dispatch('stoppresent', null);
            };
            store.dispatch('present', windowobj);
        });
    }
};
