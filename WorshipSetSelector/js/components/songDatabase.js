import Component from '../lib/component.js';
import store from '../store/index.js';

export default class SongDatabase extends Component {

    constructor() {
        super({ store, element: document.querySelector('.songdatabase') });
        // Initialize the function with a store
        // The element: document.querySelector essentially finds all objects
        //   with class .js-items and replaces html/adds event listeners etc.
        //   according to the render function
    }

    render() {
        let self = this;

        if (store.state.globalSongs.length === 0) {
            self.element.innerHTML = `
              <p class="no-items">
                No songs in database.
              </p>`;
            return;
        }

        self.element.innerHTML = `
            ${store.state.globalSongs.map((song, index) => {
                return `<div class="songInDatabase">
                            <p class="songTitle">${song.title}</p>
                            <i class="bi-file-earmark-plus addSongToSetButton"></i>
                        </div>`
            }).join('')}
        `;

        self.element.querySelectorAll('.addSongToSetButton').forEach((button, index) => {
            button.addEventListener('click', () => {
                // Find "Song" Item
                var songTitle = button.parentNode.querySelector(".songTitle").textContent;
                for (let index in store.state.globalSongs)
                {
                    var song = store.state.globalSongs[index];
                    if (song.title == songTitle) {
                        if (store.state.songs.includes(song)) {
                            return;
                        }

                        // Add to store.state.songs list
                        var temp = store.state.songs;
                        temp.push(song);
                        store.state.songs = temp;

                        return;
                    }
                }

            });
        });

    }
};
