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
            self.element.innerHTML = `<p>This song is empty :(</p>`; //empty object for a lack of lyrics
            return;
        }
       
        let lyricsArray = lyrics.replaceAll(/\n\s+\n/g, '\n\n').replaceAll('\n', '<br>').split("<br><br>");

        self.element.innerHTML = `
            <div class="list-group list-group-flush">
            ${lyricsArray.map((lyric, index) => {
                if (index != store.state.currlyric)
                    return `<button class="list-group-item currlyricsitem">
                        ${lyric}</li>`
                else 
                    return `<button class="list-group-item currlyricsitem active">
                        ${lyric}</li>`
            }).join('')}
            </div>
        `;

        self.element.querySelectorAll('.currlyricsitem').forEach((button, index) => {
            button.addEventListener('click', () => {
                console.log(index);
                store.dispatch('setCurrLyric', index); 
            });
        });
    }
};
