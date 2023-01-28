
function addSongPopUp() {
    document.getElementById("popup-addsong").style.display = "block";
    document.getElementById("popup-background").style.zIndex = 3;
    document.getElementById("song_sheet_input").value = document.getElementById("text_entry").value;
  }

  function closeAddSongPopUp() {
    document.getElementById("popup-addsong").style.display = "none";
    document.getElementById("popup-background").style.zIndex = 1;
  }
  
  function editSongLibraryPopUp(){
    document.getElementById("popup-editlibrary").style.display = "block";
    document.getElementById("popup-background").style.display = "block";
  }
  
  function closeEditSongLibraryPopUp() {
    document.getElementById("popup-editlibrary").style.display = "none";
    document.getElementById("popup-background").style.display = "none";
  }

  function closePopUp() {
    document.getElementById("popup-addsong").style.display = "none";
    document.getElementById("popup-background").style.zIndex = 1;
    document.getElementById("popup-editlibrary").style.display = "none";
    document.getElementById("popup-background").style.display = "none";
  }
  
  function addSongSubmit() {
  //TODO check if all fields have valid entries
  
    var song = new Object();
    song.title = document.getElementById("song_title_input").value;
    song.author = document.getElementById("song_author_input").value;
    song.tempo = document.getElementById("song_tempo_input").value;
    song.sheet = document.getElementById("song_sheet_input").value;
  
  
  //check if database exists
  if (localStorage.getItem("song_database") === null) {
      localStorage.setItem("song_database", JSON.stringify([]));
      console.log("Creating New Personal Song Database");
  }
  
  var song_database = JSON.parse(localStorage.getItem("song_database"));
  song_database.push(song);
  localStorage.setItem("song_database", JSON.stringify(song_database));
  console.log(localStorage.getItem("song_database"));
  
  //close popup
  document.getElementById("popup-addsong").style.display = "none";
  document.getElementById("popup-background").style.display = "none";
  
  location.reload();
  }
  
  function removePersonalSong() {

  if (localStorage.getItem("song_database") != null) {
        let target_title = this.parentNode.firstChild.innerText;
        console.log(target_title)

        let song_database = JSON.parse(localStorage.getItem("song_database"));

        for (let i=0; i<song_database.length;i++) {
            console.log(song_database[i].title);

            if (song_database[i].title == target_title) {
                song_database.splice(i, 1);

                localStorage.setItem("song_database", JSON.stringify(song_database));
                console.log(target_title + " removed");

                location.reload();


            }
        }
  }
  }

  function readJSONDatabase() {
    var db = document.getElementById("database_reader").files[0].text();
    db.then(db=>localStorage.setItem("song_database", db));
    location.reload();
  }

  function downloadPersonalLibrary(){

    if (localStorage.getItem("song_database") != null) {

      var today = new Date();
      var date = String(today.getMonth() + 1).padStart(2, '0') + String(today.getDate()).padStart(2, '0') + String(today.getFullYear()).substring(2);
      var write_name = 'db_' + date;

      const a = document.createElement('a');
      const file = new Blob([localStorage.getItem("song_database")], {type: "application/json"});
      
      a.href= URL.createObjectURL(file);
      a.download = write_name;
      a.click();
    
      URL.revokeObjectURL(a.href);
    }
  }