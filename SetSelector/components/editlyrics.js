const editLyrics_html = `
<div id="popup-editlyrics" class="popup">
  <p class="section_label"> Edit Lyrics</p>
  <img class="popup_close" src="icons/x-circle-fill.svg" onclick="closeEditLyricsPopUp()">
  <textarea id="edit_lyrics_input" class="popup_input" placeholder="Use two blank lines to separate verse/chorus/etc."></textarea>
  <button id="edit_lyrics_submit" class="popup_input" onclick="editLyrics()"> Submit Changes</button>
</div>
`

function editLyricsPopUp() {
    document.getElementById("editlyricspopupplaceholder").style.display = "block";
    document.getElementById("popup-background").style.display = "block";

    let search_id = CURRENT_SONG_ID;
    let song = SONG_DATABASE.find(s=>s.id == search_id);
    document.getElementById("edit_lyrics_input").value = song.lyrics;


    /*OLD WAY
    document.getElementById("edit_lyrics_input").value = 
    document.querySelector("#set_list_items > li[data-song-no='" + 
      String(CURRENT_SET_SONG_NO) + "']").getAttribute("data-lyrics");*/
  }
  
  function closeEditLyricsPopUp() {
    document.getElementById("editlyricspopupplaceholder").style.display = "none";
    document.getElementById("popup-background").style.display = "none";
  }
  
  function editLyrics() {
    //change lyrics in database
    let search_id = CURRENT_SONG_ID;
    let song = SONG_DATABASE.find(s=>s.id == search_id);
    song.lyrics = document.getElementById("edit_lyrics_input").value;
    localStorage.setItem("song_database", JSON.stringify(SONG_DATABASE));

    //refresh lyrics and database
    reloadDatabase();
    clearLyrics();

    //if selected from set list, change lyrics in current node as well (as reload database does not change it)
    //select the current song as well
    let target_node = document.querySelector("#set_list_items > li[data-song-no='" + String(CURRENT_SET_SONG_NO) + "']");

    if (target_node !== null) {
      target_node.setAttribute("data-lyrics", document.getElementById("edit_lyrics_input").value);
      selectCurrentSong(target_node);
    }

    //close popup
    closeEditLyricsPopUp();
  }


  //Initialize Edit Lyrics Popup into Placeholder in main html
function reloadEditLyrics() {
    document.getElementById("editlyricspopupplaceholder").innerHTML = editLyrics_html;
}
  reloadEditLyrics(); 