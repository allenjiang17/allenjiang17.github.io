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

    document.getElementById("edit_lyrics_input").value = 
    document.querySelector("#set_list_items > li[data-song-no='" + 
      String(CURRENT_SET_SONG_NO) + "']").getAttribute("data-lyrics");
  }
  
  function closeEditLyricsPopUp() {
    document.getElementById("editlyricspopupplaceholder").style.display = "none";
    document.getElementById("popup-background").style.display = "none";
  }
  
  function editLyrics() {
    var target_node = document.querySelector("#set_list_items > li[data-song-no='" +  String(CURRENT_SET_SONG_NO) + "']");
    console.log(target_node.getAttribute("data-id"));

    //change in database
    let song_database = JSON.parse(localStorage.getItem("song_database"));
  
    for (let i=0; i<song_database.length;i++) {
      if (song_database[i].id == target_node.getAttribute("data-id")) {
  
          let song = song_database[i];
          song.lyrics = document.getElementById("edit_lyrics_input").value;
  
          localStorage.setItem("song_database", JSON.stringify(song_database));
      }
    }

    //change current node as well
    target_node.setAttribute("data-lyrics", document.getElementById("edit_lyrics_input").value);

    reloadDatabase();
    clearLyrics();
    selectCurrentSong(target_node);
    closeEditLyricsPopUp();
  }


  //Initialize Edit Lyrics Popup into Placeholder in main html
function reloadEditLyrics() {
    document.getElementById("editlyricspopupplaceholder").innerHTML = editLyrics_html;
}
  reloadEditLyrics(); 