import Component from '../lib/component.js';
import store from '../store/index.js';

export default class List extends Component {

    constructor() {
        super({store, element: document.querySelector('.js-items')}); 
        // Initialize the function with a store
        // The element: document.querySelector essentially finds all objects
        //   with class .js-items and replaces html/adds event listeners etc.
        //   according to the render function
    }

    render() {
        let self = this;

        if(store.state.items.length === 0) {
            self.element.innerHTML = `
              <p class="no-items">
                You've done nothing yet &#x1f622;
              </p>`;
            return;
        }

        // HTML code of an object is defined by the element.innerHTML prop
        // 
        // This can be defined using the backticks according to ES6, which
        // allows a bash like variable syntax, where you run code/access
        // variables using ${} within the backticks.

        self.element.innerHTML = `
            <ul class="app__items">
            ${store.state.items.map(item => {
                return `
                    <li>${item}<button aria-label="Delete this item">×</button></li>
                `
            }).join('')}
            </ul>
        `;

        self.element.querySelectorAll('button').forEach((button, index) => {
            button.addEventListener('click', () => {
                store.dispatch('clearItem', { index }); 
                // callback function taking in a single param index
            });
        });
    }
};
