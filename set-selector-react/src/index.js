import React, {useState} from 'react';
import ReactDOM from 'react-dom/client';
import {DATABASE} from './database.js';
import {Search} from './search.js';
import {DraggableList} from './draggablelist.js';
import {SongDisplay} from './songdisplay.js';

import './styles.css';

function SetSelector(props){
  const [set_list, update_set_list] = useState([]);
  const [current, update_current] = useState();
  const database = DATABASE;

  function addSongToSet(event) {
    //React state objects should be considered immutable.
    // Mutating the array won't cause the state change to be noticed for re-render
    let song_id = event.target.getAttribute("data-id");
    update_set_list([...set_list, song_id]);
  }

  function deleteSongFromSet(event) {

    var index = Array.prototype.indexOf.call(event.target.parentNode.parentNode.children, event.target.parentNode);
    set_list.splice(index, 1);
    const new_set_list = [...set_list];
    update_set_list(new_set_list);
  }

  function selectSongToDisplay(event) {
    console.log("selected");
    update_current(database.find(song => song.id == event.target.getAttribute("data-id")));
  }

  return (
  <React.StrictMode>
  <div id="header">
    <div>
      <img id="ssm_icon" src="icons/ssm_icon.png"/>
    <h1>Worship Set Selector</h1>
    </div>
  </div>

  <div id="wrapper">
    <div id="side_bar">
        <p id="song_list_label" className = "section_label section_label_top">Songs</p>
        <Search database = {props.database} 
          clickFunction = {addSongToSet}
          selectFunction = {selectSongToDisplay}/>
        <p id="set_list_label" className = "section_label">Set List</p>
        <DraggableList database = {props.database} 
          set_list={set_list} 
          deleteFunction = {deleteSongFromSet}
          selectFunction = {selectSongToDisplay}/>
    </div>
    <div id="chord_display">
      <SongDisplay song = {current}/>
    </div>
  </div>
  </React.StrictMode>
  )


}
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<SetSelector database={DATABASE}/>)

