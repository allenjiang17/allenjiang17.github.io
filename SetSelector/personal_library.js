function editSongLibraryPopUp(){
  document.getElementById("popup-editlibrary").style.display = "block";
  document.getElementById("popup-background").style.display = "block";
  
}

function closeEditSongLibraryPopUp() {
  document.getElementById("popup-editlibrary").style.display = "none";
  document.getElementById("popup-background").style.display = "none";
  for (let node of document.getElementsByClassName('popup-placeholder')) 
    node.style.display = "none";
}

function closePopUp() {
  document.getElementById("popup-addsong").style.display = "none";
  document.getElementById("popup-background").style.zIndex = 10;
  document.getElementById("popup-editlibrary").style.display = "none";
  document.getElementById("popup-background").style.display = "none";
  for (let node of document.getElementsByClassName('popup-placeholder')) 
    node.style.display = "none";
}

function addSongSubmit() {
  //TODO check if all fields have valid entries

  var song = new Object();
  song.id = String("p" + localStorage.getItem("no_songs_added")+1);
  console.log("Adding New Song with ID" + song.id);

  song.title = document.getElementById("song_title_input").value;
  song.author = document.getElementById("song_author_input").value;
  song.tempo = document.getElementById("song_tempo_input").value;
  song.sheet = document.getElementById("song_sheet_input").value;
  song.lyrics = remove_chord_lines(song.sheet);

  var song_database = JSON.parse(localStorage.getItem("song_database"));
  song_database.push(song);
  localStorage.setItem("song_database", JSON.stringify(song_database));
  console.log(localStorage.getItem("song_database"));

  //close popup
  document.getElementById("popup-addsong").style.display = "none";
  document.getElementById("popup-background").style.display = "none";

  reloadDatabase();
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
