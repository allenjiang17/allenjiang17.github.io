import Component from '../lib/component.js';
import store from '../store/index.js';

export default class SongList extends Component {

    constructor() {
        super({store, element: document.querySelector('.songlist')}); 
        // Initialize the function with a store
        // The element: document.querySelector essentially finds all objects
        //   with class .js-items and replaces html/adds event listeners etc.
        //   according to the render function
    }

    render() {
        let self = this;

        if(store.state.songs.length === 0) {
            self.element.innerHTML = `
              <p class="no-items">
                No songs added yet
              </p>`;
            return;
        }

        // HTML code of an object is defined by the element.innerHTML prop
        // 
        // This can be defined using the backticks according to ES6, which
        // allows a bash like variable syntax, where you run code/access
        // variables using ${} within the backticks.

        self.element.innerHTML = `
            ${store.state.songs.map((song, index) => {
                if (index != store.state.previewsong)
                    return `<div class="songitem">${song.title}</div>`
                else 
                    return `<div class="songitem selsongitem">${song.title}</div>`
            }).join('')}
        `;

        let timer = null;
        self.element.querySelectorAll('.songitem').forEach((button, index) => {
            button.addEventListener('click', (e) => {
                if (e.detail === 1) {
                    timer = setTimeout(() => {
                        store.dispatch('previewSong', index);},
                    300);
                } else {
                    clearTimeout(timer);
                    store.dispatch('selectSong', index); 
                }
                // callback function taking in a single param index
            });
        });
    }
};
