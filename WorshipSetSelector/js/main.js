import store from './store/index.js';

import SongList from './components/songlist.js';
import PreviewLyrics from './components/prevlyrics.js';

const slInstance = new SongList();
const plInstance = new PreviewLyrics();

slInstance.render();
plInstance.render();
