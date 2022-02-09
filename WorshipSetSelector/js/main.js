import store from './store/index.js';

import SongList from './components/songlist.js';
import PreviewLyrics from './components/prevlyrics.js';
import PresentButton from './components/presentbutton.js';

const slInstance = new SongList();
const plInstance = new PreviewLyrics();
const pbInstance = new PresentButton();

slInstance.render();
plInstance.render();
pbInstance.render();
