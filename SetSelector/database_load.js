//Main Initialization Sequence

console.log(localStorage.getItem("song_database"));

if (!localStorage.getItem("song_database")) {
  console.log("No Existing Database, Initializing From Default Database");
  initializeDatabase();
}

loadDatabase();

/**FUNCTIONS */

//initializes the local storage database using the core/default database in the project folder
//var DATABASE imported from previous javascript, as a JSON hack
function initializeDatabase() {
    //init local database
    var song_database = [];

  for (let i=0; i<DATABASE.length; i++) {    
    var song = new Object();
    song.id = String("d" + i); //d for default
    song.title = DATABASE[i].title;
    song.author = DATABASE[i].author;
    song.tempo = DATABASE[i].tempo;
    song.sheet = DATABASE[i].sheet;
    song.lyrics = remove_chord_lines(song.sheet);

    song_database.push(song);
  }
  localStorage.setItem("song_database", JSON.stringify(song_database));

  //set an additional counter for new songs added with "p" personal tag
  localStorage.setItem("no_songs_added", 0);
}

function loadDatabase() {
  let song_database = JSON.parse(localStorage.getItem("song_database"));

  for (let i = 0; i<song_database.length; i++) {
    let newEntry = document.createElement("li");
    let newTitle = document.createElement("div");

      newEntry.setAttribute("id", "song" + song_database[i].id);
      newEntry.className = "search_list";
      newEntry.setAttribute("data-id", song_database[i].id);
      newEntry.setAttribute("data-author", song_database[i].author);
      newEntry.setAttribute("data-tempo", song_database[i].tempo);
      newEntry.setAttribute("data-sheet", song_database[i].sheet);
      newEntry.setAttribute("data-lyrics", song_database[i].lyrics);
      newEntry.addEventListener("click", addFromSearch);
      newEntry.addEventListener("dblclick", addSongToSetDblClick);

      newTitle.setAttribute("id", "song-title" + song_database[i].id);
      newTitle.className = "search_list_title";
      newTitle.innerText = song_database[i].title;

      newEntry.appendChild(newTitle);
      document.getElementById("search_results").appendChild(newEntry);

      //add to edit library popup search
      let newEntry_edit= document.createElement("li");
      let newTitle_edit = document.createElement("div");
      newEntry_edit.className = "set_list_item";
      newTitle_edit.className = "set_title";
      newTitle_edit.innerText = innerText = song_database[i].title;


      let newButtonZone_edit = document.createElement("div");
      let newDeleteButton_edit = document.createElement("img");
        newDeleteButton_edit.className = "set_delete";
        newDeleteButton_edit.setAttribute("src", "icons/trash-fill.svg");
        newDeleteButton_edit.addEventListener("click", removePersonalSong);

      let newEditButton_edit = document.createElement("img");
        newEditButton_edit.className = "set_delete";
        newEditButton_edit.setAttribute("src", "icons/pencil-square.svg");
        //TODO: newEditButton_edit.addEventListener("click", );

      newButtonZone_edit.appendChild(newEditButton_edit);
      newButtonZone_edit.appendChild(newDeleteButton_edit);


      newEntry_edit.appendChild(newTitle_edit);
      newEntry_edit.appendChild(newButtonZone_edit);

      document.getElementById("popup-personal_search_results")
          .appendChild(newEntry_edit);
    }

}


function reloadDatabase() {
  dumpDatabase();
  loadDatabase();
}

function removeChildren(target) {
  var child = target.lastElementChild;
  while(child) {
    target.removeChild(child);
    child = target.lastElementChild;
  }
}

function dumpDatabase() {
  removeChildren(document.getElementById("search_results"));
  removeChildren(document.getElementById("popup-personal_search_results"));
}

/*
function loadPersonalDatabase() {
  //access user's personal song storage
  if (localStorage.getItem("song_database") != null) {
    let song_database = JSON.parse(localStorage.getItem("song_database"));

    for (let i = 0; i<song_database.length; i++) {
      let newEntry = document.createElement("li");
      let newTitle = document.createElement("div");

      newEntry.setAttribute("id", "song" + i + DATABASE.length);
      newEntry.className = "search_list";
      newEntry.setAttribute("data-id", i + DATABASE.length);
      newEntry.setAttribute("data-author", song_database[i].author);
      newEntry.setAttribute("data-tempo", song_database[i].tempo);
      newEntry.setAttribute("data-sheet", song_database[i].sheet);
      newEntry.setAttribute("data-lyrics", song_database[i].lyrics);
      newEntry.addEventListener("click", addFromSearch);
      newEntry.addEventListener("dblclick", addSongToSetDblClick);

      newTitle.setAttribute("id", "song-title" + i + DATABASE.length);
      newTitle.className = "search_list_title";
      newTitle.innerText = song_database[i].title;

      newEntry.appendChild(newTitle);
      document.getElementById("search_results").appendChild(newEntry);

      //add to personal library results

      let newEntry_personal= document.createElement("li");
      let newTitle_personal = document.createElement("div");
      newEntry_personal.className = "set_list_item";
      newTitle_personal.className = "set_title";
      newTitle_personal.innerText = innerText = song_database[i].title;

      let newButton_personal = document.createElement("img");
      newButton_personal.className = "set_delete";
      newButton_personal.setAttribute("src", "icons/trash-fill.svg");
      newButton_personal.addEventListener("click", removePersonalSong);

      newEntry_personal.appendChild(newTitle_personal);
      newEntry_personal.appendChild(newButton_personal);

      document.getElementById("popup-personal_search_results")
          .appendChild(newEntry_personal);
    }
  }
}
*/
