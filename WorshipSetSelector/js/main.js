import store from './store/index.js';

import SongList from './components/songlist.js';
import PreviewLyrics from './components/prevlyrics.js';
import CurrLyrics from './components/currlyrics.js';
import PresentButton from './components/presentbutton.js';
import CurrentDisplay from './components/currentdisplay.js'

const slInstance = new SongList();
const plInstance = new PreviewLyrics();
const clInstance = new CurrLyrics();
const pbInstance = new PresentButton();
const cdInstance = new CurrentDisplay();

slInstance.render();
plInstance.render();
pbInstance.render();
cdInstance.render();
clInstance.render();
