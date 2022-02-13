import store from './store/index.js';

import SongList from './components/songlist.js';
import PreviewLyrics from './components/prevlyrics.js';
import CurrLyrics from './components/currlyrics.js';
import PresentButton from './components/presentbutton.js';
import CurrentDisplay from './components/currentdisplay.js';
import PreviewDisplay from './components/prevdisplay.js';
import Presentation from './components/presentation.js';
import SongDatabase from './components/songDatabase.js';


const sdInstance = new SongDatabase();
const slInstance = new SongList();
const plInstance = new PreviewLyrics();
const clInstance = new CurrLyrics();
const pbInstance = new PresentButton();
const cdInstance = new CurrentDisplay();
const pdInstance = new PreviewDisplay();
const presInstance = new Presentation();

sdInstance.render();
slInstance.render();
plInstance.render();
pbInstance.render();
cdInstance.render();
pdInstance.render();
clInstance.render();
presInstance.render();
