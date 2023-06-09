import React, {useState} from 'react';

export function DraggableList(props) {
    const listItems = props.set_list.map(
        (song_id,index) => 
        {return <ListItem key={index} 
        song = {props.database.find(song => (song_id == song.id))} 
        deleteFunction = {props.deleteFunction}
        selectFunction = {props.selectFunction}/>});

    return (<ul>
        {listItems}
    </ul>)
}

function ListItem(props) {

    return (<li data-id={props.song.id} onClick = {props.selectFunction}>
        {props.song.title}
        <ListButton deleteFunction = {props.deleteFunction}/>
        </li>)
}

function ListButton(props) {
    return <img src= "icons/x-lg.svg" onClick={props.deleteFunction}/>
}



/*
        onDragStart={handleDragStart}
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDragEnd={handleDragEnd}
        onDragOver={handleDragOver}
        onDrop={handleDrop}>

*/