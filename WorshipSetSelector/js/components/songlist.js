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
                No songs added yet;
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
                if (index != store.state.currsong)
                    return `<div class="songitem">
                                <div class="songTitle">${song.title}</div>
                            </div>`
                else 
                    // Added Delete Button
                    return `<div class="songitem selsongitem">
                                <div class="songTitle">${song.title}</div>
                                <button class="deleteButton">Delete Song from Set</p>
                            </div>`
            }).join('')}
        `;

        self.element.querySelectorAll('.songTitle').forEach((button, index) => {
            button.addEventListener('click', () => {
                console.log(index);
                store.dispatch('selectSong', index); 
                // callback function taking in a single param index
            });
        });

        // Delete Functionality
        self.element.querySelectorAll('.deleteButton').forEach((deleteButton, index) => {
            deleteButton.addEventListener('click', () => {
                var songTitle = deleteButton.parentNode.querySelector(".songTitle").textContent;
                var newSongList = store.state.songs.filter(
                    function (value, index, arr) {
                        return value.title != songTitle;
                    }
                )
                store.dispatch('deleteSong', newSongList);
            });
        });
    }
};
