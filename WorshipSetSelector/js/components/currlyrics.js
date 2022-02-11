import Component from '../lib/component.js';
import store from '../store/index.js';

export default class CurrLyrics extends Component {

    constructor() {
        super({store, element: document.querySelector('.currentlyrics')}); 
    }

    render() {
        let self = this;

        if(store.state.currsong === null) {
            self.element.innerHTML = `<p> </p>`; //empty object for a lack of lyrics
            return;
        }

        let lyrics = store.state.songs[store.state.currsong].lyrics;

        if(!(lyrics)) {
            self.element.innerHTML = `<p> </p>`; //empty object for a lack of lyrics
            return;
        }
        
        lyrics = lyrics.replaceAll('\n', '<br>');

        self.element.innerHTML = `
            <div class="currlyricsitem">${lyrics}</div>
        `;

        self.element.querySelectorAll('.currlyricsitem').forEach((button, index) => {
            button.addEventListener('click', () => {
                console.log(index);
                //store.dispatch('selectPreviewLyric', index); 
            });
        });
    }
};
