import React, {useState} from 'react';

//Components
export function Search(props){
    const [search_text, set_search_text] = useState("");
    const database = props.database;
  
    function handleInput(event) {
      set_search_text(event.target.value);
    }
  
    //search function
    let input = search_text.toUpperCase();
    let showList = database.filter(song => song.title.toUpperCase().indexOf(input) == 0);

    //hide if no search text 
    if (input.length == 0) {
        showList = [];
    }

    return (<div>
      <SearchBar handlename = {handleInput}/>  
      <SearchBarResults showList = {showList} 
      clickFunction = {props.clickFunction}
      selectFunction = {props.selectFunction}/>
    </div>)
  }
  
  function SearchBar(props) {
    return <input type="text" placeholder="Search.." onChange={props.handlename}/>
  }
  
  function SearchBarResults(props){
    const listItems = props.showList.map((song,index) => {return (<SearchBarResultsItem key = {index} song = {song} clickFunction = {props.clickFunction} selectFunction = {props.selectFunction}/>)});
  
    return (<ul>
      {listItems}
    </ul>)
  
  }
  
  function SearchBarResultsItem(props){
    return <li data-id={props.song.id} onClick={props.selectFunction} onDoubleClick={props.clickFunction}>{props.song.title}</li>
  }
  