
const editLibrary_html = `
<div id="popup-editlibrary" class="popup">
    <p class="section_label" style="font-size: 1.3rem"> Personal Song Library</p>
    <img class="popup_close" src="icons/x-circle-fill.svg" onclick="closeEditSongLibraryPopUp()">
    <div id="popup-personal_search_content" class="search_bar_content">
    <ul id="popup-personal_search_results" class="search_results"></ul>
    </div>
    <button class="dashboard_button" style="width:fit-content; margin-top:1rem;" onclick="addSongPopUp()"> Add Song</button>

    <p class="section_label" style="margin-top:2rem" 
      title="If you would like to save your personal library, you can download 
      it as a JSON file, or upload one.">
      Uploading/Exporting Your Personal Library</p>
    <div class="clickable_link" onclick="resetLocalDatabase()"> Reset to Default SSM Library </div>
    <br>
    <div class="clickable_link" onclick="downloadPersonalLibrary()" style="margin:0"> 
      <img class="icon_button" src="icons/database-down.svg" onclick="downloadPersonalLibrary()" style="display:inline">
      Save Personal Library as a JSON File
    </div>
    <br>
    <div style="margin:0"> 
      <div class="clickable_link" onclick="readJSONDatabase()" style="display:inline-block"> 
        <img class="icon_button" src="icons/database-up.svg" onclick="readJSONDatabase()" style="display:inline-block">
        Upload a Personal Library Database File (JSON) 
      </div>
        <p class="small_label" style="margin:0.1rem">This will replace your current library with the uploaded database</p>
        <input id="database_reader" type="file" style="font-size:0.7rem" class="popup_input" accept=".json">
    </div> 
</div>
`
function editSongLibraryPopUp(){
    document.getElementById("editlibrarypopupplaceholder").style.display = "block";
    document.getElementById("popup-background").style.display = "block";  
  }
  
  function closeEditSongLibraryPopUp() {
    document.getElementById("editlibrarypopupplaceholder").style.display = "none";
    document.getElementById("popup-background").style.display = "none";
  }
  
  function closeAllPopUp() {
    for (let node of document.getElementsByClassName('popup-placeholder')) 
      node.style.display = "none";
  }

  function removePersonalSong() {

    let target_title = this.parentNode.parentNode.firstChild.innerText;
    console.log(target_title)

    let song_database = JSON.parse(localStorage.getItem("song_database"));

    for (let i=0; i<song_database.length;i++) {
      console.log(song_database[i].title);

      if (song_database[i].title == target_title) {
          song_database.splice(i, 1);
          localStorage.setItem("song_database", JSON.stringify(song_database));
          console.log(target_title + " removed");

          reloadDatabase();
      }
    }
}


function resetLocalDatabase(){
  if (confirm("You will lose all of your edits/added songs and reset the library to the default one. Proceed?")) {
    initializeDatabase();
    reloadDatabase();
  }
}

function readJSONDatabase() {
  var db = document.getElementById("database_reader").files[0].text();
  db.then(db=>localStorage.setItem("song_database", db));
  reloadDatabase();
}

function downloadPersonalLibrary(){
  if (localStorage.getItem("song_database") != null) {

    var today = new Date();
    var date = String(today.getMonth() + 1).padStart(2, '0') + 
      String(today.getDate()).padStart(2, '0') + 
      String(today.getFullYear()).substring(2);
    var write_name = 'db_' + date;

    const a = document.createElement('a');
    const file = new Blob([localStorage.getItem("song_database")], 
      {type: "application/json"});
    
    a.href= URL.createObjectURL(file);
    a.download = write_name;
    a.click();
  
    URL.revokeObjectURL(a.href);
  }
}




//Initialize Edit Library Pop Up into Placeholder in main html
function reloadEditLibrary() {
    document.getElementById("editlibrarypopupplaceholder").innerHTML = editLibrary_html;
  }
  
  reloadEditLibrary(); 
