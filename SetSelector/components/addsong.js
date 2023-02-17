
const addsong_html = `
<div id="popup-addsong" class="popup">
    <p id="popup-title" class="section_label"> Add Song to Library</p>
    <img class="popup_close" src="icons/x-circle-fill.svg" onclick="closeAddSongPopUp()">
        <label for="song_title_input" class="form_label">Title</label>
        <input type="text" id="song_title_input" name="song_title_input" class="popup_input" required>
        <label for="song_author_input" class="form_label">Author</label>
        <input type="text" id="song_author_input" name="song_author_input" class="popup_input" required>
        <!--
        <label for="song_tempo_input" class="form_label">Tempo</label>
        <select id="song_tempo_input" class="popup_input" required>
            <option value="Fast">Fast</option>
            <option value="Medium">Medium</option>
            <option value="Slow">Slow</option>
            <option value="Intercessory">Intercessory</option>
        </select>
        -->
        <label for="song_sheet_input" class="form_label" required>Chord Sheet</label>
        <textarea id="song_sheet_input" class="popup_input" 
        placeholder="Use two blank lines to separate verse/chorus/etc. Use TEMPO: line to designate tempo."></textarea>
        <button id="song_input_submit" class="popup_input" onclick="addSongSubmit()">Add Song</button>
</div>
`

function addSongPopUp() {
  closeEditSongLibraryPopUp();

  document.getElementById("addsongpopupplaceholder").style.display = "block";
  document.getElementById("popup-background").style.display = "block";  

  document.getElementById("song_sheet_input").value = 
      document.getElementById("text_entry").value;
}

function closeAddSongPopUp() {
  document.getElementById("addsongpopupplaceholder").style.display = "none";
  document.getElementById("popup-background").style.display = "none";

  editSongLibraryPopUp();
}

function addSongSubmit() {
  if(document.getElementById("song_title_input").value.trim() == "") {
    alert("Please use a valid title.");
    return;
  }

  let song = new Object();
  song.id = String("p" + personalCount());
  console.log("Adding New Song with ID" + song.id);

  song.title = document.getElementById("song_title_input").value;
  song.author = document.getElementById("song_author_input").value;
  song.sheet = document.getElementById("song_sheet_input").value;
  song.lyrics = remove_chord_lines(song.sheet);
  song.tempo = getTempo(song.lyrics);

  SONG_DATABASE.push(song);
  saveSong(song);

  closeAddSongPopUp();
  document.getElementById("song_title_input").value = "";
  document.getElementById("song_author_input").value = "";
  document.getElementById("song_sheet_input").value = "";

  reloadDatabase();
}




//Initialize Add Song Pop Up into Placeholder in main html
function reloadAddSong() {
  document.getElementById("addsongpopupplaceholder").innerHTML = addsong_html;
}

reloadAddSong(); 
