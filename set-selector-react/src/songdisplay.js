import React, {useState} from 'react';

export function SongDisplay(props) {

    let display = "";
   if (props.song !== undefined) {
    display = props.song.title + "\n" + props.song.author + "\n" + props.song.tempo + "\n" + props.song.sheet;
   }
    return (
        <textarea value={display}></textarea>
    )

}