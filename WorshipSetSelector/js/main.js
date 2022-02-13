import store from './store/index.js';

import SongList from './components/songlist.js';
import PreviewLyrics from './components/prevlyrics.js';
import SongDatabase from './components/songDatabase.js';


const sdInstance = new SongDatabase();
const slInstance = new SongList();
const plInstance = new PreviewLyrics();

sdInstance.render();
slInstance.render();
plInstance.render();
