const editLyrics_html = `
<div id="popup-editlyrics" class="popup">
  <p class="section_label"> Edit Lyrics</p>
  <img class="popup_close" src="icons/x-circle-fill.svg" onclick="closeEditLyricsPopUp()">
  <textarea id="edit_lyrics_input" class="popup_input" placeholder="Use two blank lines to separate verse/chorus/etc."></textarea>
  <button id="edit_lyrics_submit" clsas="popup_input" onclick="editLyrics()"> Submit Changes (Saved Locally Only)</button>
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
    //TODO: make this persist longer in local storage, as refreshing the page will lose this 
    var target_node = document.querySelector("#set_list_items > li[data-song-no='" +  String(CURRENT_SET_SONG_NO) + "']");
    target_node.setAttribute("data-lyrics", document.getElementById("edit_lyrics_input").value);
  
    clearLyrics();
    selectCurrentSong(target_node);
  
    closeEditLyricsPopUp();
  }


  //Initialize Edit Lyrics Popup into Placeholder in main html
function reloadEditLyrics() {
    document.getElementById("editlyricspopupplaceholder").innerHTML = editLyrics_html;
}
  reloadEditLyrics(); 