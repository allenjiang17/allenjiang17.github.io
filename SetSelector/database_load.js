// Main Initialization Sequence

if (checkMobile()) {
  loadDatabaseMobile();
} else {
  loadDatabase();
  initializeTempo();
}


/**FUNCTIONS */

function personalCount() {
  let count = 0;
  let localdb = JSON.parse(localStorage.getItem("song_database"));
  if (localdb == null | localdb == "[]" | !localdb) {return 0;}
  localdb.forEach((song, i) => {
    if(song.id.startsWith('p')) { count++; }
  });
  return count;
}

function editedCount() {
  let count = 0;
  let localdb = JSON.parse(localStorage.getItem("song_database"));
  if (localdb == null | localdb == "[]" | !localdb) {return 0;}
  localdb.forEach((song, i) => {
    if(song.id.startsWith('d')) { count++; }
  });
  return count;
}

/**
 * Removes global songs from the local database
 */
function databaseVersionClean() {
  let localdb = JSON.parse(localStorage.getItem("song_database"));
  if(localdb == null) { return; }
  if(localdb == '[]') { localdb = []; }
  let nlocaldb = []
  if(localdb.length > 170) {
    console.log(localdb.length);
    localdb.forEach((song, i) => {
      if(song.id.startsWith('p')) {
        nlocaldb.push(song)
      }
    })
    if(confirm("Removing " + (localdb.length - nlocaldb.length) + 
      "songs from the local database. This should be a one-time change as we " +
      "change the way personal/database songs are stored on your browser. You may " +
      "lose some of the edits you've made to the default song database. Proceed?"
    )) {
      localStorage.setItem("song_database", JSON.stringify(nlocaldb));
    }
  }
}

function alphabetizeDatabase(db) {
  return db.sort((a, b) => a.title.localeCompare(b.title));
}

/**
 * Merges the local database (local songs plus edited songs) with the global
 * database.
 */
function mergeDatabase() {
  databaseVersionClean();
  SONG_DATABASE = JSON.parse(localStorage.getItem("song_database"));
  if(SONG_DATABASE == null) {SONG_DATABASE = DATABASE; return;}

  for (let i=0; i < DATABASE.length; i++) { // DATABASE is the global db
    let replace_index = SONG_DATABASE
        .findIndex(song => song.id == DATABASE[i].id); // match songs by id
    if (replace_index == -1 ) {      
      let globalsong = new Object();
      globalsong.id = DATABASE[i].id;
      globalsong.title = DATABASE[i].title;
      globalsong.author = DATABASE[i].author;
      globalsong.tempo = DATABASE[i].tempo;
      globalsong.sheet = DATABASE[i].sheet;
      globalsong.lyrics = DATABASE[i].lyrics;
      SONG_DATABASE.push(globalsong);
    }
  }
  SONG_DATABASE = alphabetizeDatabase(SONG_DATABASE);
}

function loadDatabase() {
  mergeDatabase();
  for (let i = 0; i < SONG_DATABASE.length; i++) {
    let newEntry = document.createElement("li");
    let newTitle = document.createElement("div");

      newEntry.setAttribute("id", "song" + SONG_DATABASE[i].id);
      newEntry.className = "search_list";
      newEntry.setAttribute("data-id", SONG_DATABASE[i].id);
      newEntry.setAttribute("data-author", SONG_DATABASE[i].author);
      newEntry.setAttribute("data-tempo", SONG_DATABASE[i].tempo);
      newEntry.setAttribute("data-sheet", SONG_DATABASE[i].sheet);
      newEntry.setAttribute("data-lyrics", SONG_DATABASE[i].lyrics);
      newEntry.addEventListener("click", addFromSearch);
      newEntry.addEventListener("dblclick", addSongToSetDblClick);

      newTitle.setAttribute("id", "song-title" + SONG_DATABASE[i].id);
      newTitle.className = "search_list_title";
      newTitle.innerText = SONG_DATABASE[i].title;

      newEntry.appendChild(newTitle);
      document.getElementById("main_search_results").appendChild(newEntry);

      //add to edit library popup search
      let newEntry_edit= document.createElement("li");
      let newTitle_edit = document.createElement("div");
      newEntry_edit.setAttribute("data-id", SONG_DATABASE[i].id);
      newEntry_edit.setAttribute("data-author", SONG_DATABASE[i].author);
      newEntry_edit.setAttribute("data-tempo", SONG_DATABASE[i].tempo);
      newEntry_edit.setAttribute("data-sheet", SONG_DATABASE[i].sheet);
      newEntry_edit.setAttribute("data-lyrics", SONG_DATABASE[i].lyrics);
      newEntry_edit.className = "set_list_item";
      newTitle_edit.className = "set_title";
      newTitle_edit.innerText = innerText = SONG_DATABASE[i].title;

      let newButtonZone_edit = document.createElement("div");
      newButtonZone_edit.style.marginRight = "10px";
      let newDeleteButton_edit = document.createElement("img");
        newDeleteButton_edit.className = "set_delete";
        newDeleteButton_edit.setAttribute("src", "icons/trash-fill.svg");
        newDeleteButton_edit.addEventListener("click", removeSongInLibrary);

      let newEditButton_edit = document.createElement("img");
        newEditButton_edit.className = "set_delete";
        newEditButton_edit.setAttribute("src", "icons/pencil-square.svg");
        newEditButton_edit.addEventListener("click", editSongPopUp);

      newButtonZone_edit.appendChild(newEditButton_edit);
      newButtonZone_edit.appendChild(newDeleteButton_edit);

      newEntry_edit.appendChild(newTitle_edit);
      newEntry_edit.appendChild(newButtonZone_edit);

      document.getElementById("popup-personal_search_results")
          .appendChild(newEntry_edit);
    }
}


function loadDatabaseMobile() {
  mergeDatabase();
  for (let i = 0; i<SONG_DATABASE.length; i++) {
    let newEntry = document.createElement("li");
    let newTitle = document.createElement("div");

      newEntry.setAttribute("id", "song" + SONG_DATABASE[i].id);
      newEntry.classList.add("search_list");
      newEntry.setAttribute("data-id", SONG_DATABASE[i].id);
      newEntry.setAttribute("data-author", SONG_DATABASE[i].author);
      newEntry.setAttribute("data-tempo", SONG_DATABASE[i].tempo);
      newEntry.setAttribute("data-sheet", SONG_DATABASE[i].sheet);
      newEntry.setAttribute("data-lyrics", SONG_DATABASE[i].lyrics);
      newEntry.addEventListener("click", addFromSearchMobile);

      newTitle.setAttribute("id", "song-title" + SONG_DATABASE[i].id);
      newTitle.className = "search_list_title";
      newTitle.innerText = SONG_DATABASE[i].title;

      newEntry.appendChild(newTitle);
      newEntry.classList.add("hidden");
      document.getElementById("mobile_search_results").appendChild(newEntry);
  }
}

function reloadDatabase() {
  dumpDatabase();
  loadDatabase();
  document.getElementById("text_entry").value = ""; // Clear song selection
}

function dumpDatabase() {
  removeChildren(document.getElementById("main_search_results"));
  removeChildren(document.getElementById("popup-personal_search_results"));
}
