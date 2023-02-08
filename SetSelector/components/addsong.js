
const addsong = `
<div id="popup-addsong" class="popup">
    <p id="popup-title" class="section_label"> Add Song to Local Library</p>
    <img class="popup_close" src="icons/x-circle-fill.svg" onclick="closeAddSongPopUp()">
        <label for="song_title_input" class="form_label">Title</label>
        <input type="text" id="song_title_input" name="song_title_input" class="popup_input" required>
        <label for="song_author_input" class="form_label">Author</label>
        <input type="text" id="song_author_input" name="song_author_input" class="popup_input" required>
        <label for="song_tempo_input" class="form_label">Tempo</label>
        <select id="song_tempo_input" class="popup_input" required>
            <option value="Fast">Fast</option>
            <option value="Medium">Medium</option>
            <option value="Slow">Slow</option>
            <option value="Intercessory">Intercessory</option>
        </select>
        <label for="song_sheet_input" class="form_label" required>Chord Sheet</label>
        <textarea id="song_sheet_input" class="popup_input" placeholder="Use two blank lines to separate verse/chorus/etc."></textarea>
        <button id="song_input_submit" class="popup_input" onclick="addSongSubmit()">Add Song</button>
</div>
`

function addSongPopUp() {
  closePopUp();
  document.getElementById("popup-addsong").style.display = "block";
  document.getElementById("popup-background").style.zIndex = 12;
  document.getElementById("addsongpopupplaceholder").style.display = "block";
  document.getElementById("song_sheet_input").value = 
    document.getElementById("text_entry").value;
}

function closeAddSongPopUp() {
  document.getElementById("popup-addsong").style.display = "none";
  document.getElementById("popup-background").style.zIndex = 10;
  document.getElementById("popup-background").style.display = "none";
  for (let node of document.getElementsByClassName('popup-placeholder')) 
    node.style.display = "none";
}


function reloadAddSong() {
  document.getElementById("addsongpopupplaceholder").innerHTML = addsong;
}

reloadAddSong(); 
