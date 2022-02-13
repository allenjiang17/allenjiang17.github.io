import Component from '../lib/component.js';
import store from '../store/index.js';

export default class PreviewLyrics extends Component {

    constructor() {
        super({store, element: document.querySelector('.previewlyrics')}); 
    }

    render() {
        let self = this;
        let lyrics = "";
        if (store.state.currsong >= 0 && store.state.currsong < store.state.songs.length) {
            lyrics = store.state.songs[store.state.currsong].lyrics;
        }
        else {
            self.element.innerHTML = `<p> </p>`; //empty object for a lack of lyrics
            return;
        }
        
        lyrics = lyrics.replaceAll('\n', '<br>');

        self.element.innerHTML = `
            <div class="previewlyricsitem">${lyrics}</div>
        `;
        console.log(self.element.innerHTML);

        self.element.querySelectorAll('.previewlyricsitem').forEach((button, index) => {
            button.addEventListener('click', () => {
                console.log(index);
                //store.dispatch('selectPreviewLyric', index); 
            });
        });
    }
};
