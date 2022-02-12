import Component from '../lib/component.js';
import store from '../store/index.js';

export default class PreviewLyrics extends Component {

    constructor() {
        super({store, element: document.querySelector('.previewlyrics')}); 
    }

    render() {
        let self = this;

        if(store.state.previewsong === null) {
            self.element.innerHTML = `<p> </p>`; //empty object for a lack of lyrics
            return;
        }

        let lyrics = store.state.songs[store.state.previewsong].lyrics;

        if(!(lyrics)) {
            self.element.innerHTML = `<p> </p>`; //empty object for a lack of lyrics
            return;
        }
       
        let lyricsArray = lyrics.replaceAll(/\n\s+\n/g, '\n\n').replaceAll('\n', '<br>').split("<br><br>");

        self.element.innerHTML = `
            <div class="list-group list-group-flush">
            ${lyricsArray.map((lyric, index) => {
                if (index != store.state.prevlyricIndex)
                    return `<button class="list-group-item previewlyricsitem">
                        ${lyric}</li>`
                else 
                    return `<button class="list-group-item previewlyricsitem active">
                        ${lyric}</li>`
            }).join('')}
            </div>
        `;

        self.element.querySelectorAll('.previewlyricsitem').forEach((button, index) => {
            button.addEventListener('click', () => {
                store.dispatch('setPreviewLyric', {
                    index: index, 
                    lyric: lyricsArray[index], 
                }); 
            });
        });
    }
};
