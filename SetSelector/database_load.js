//var DATABASE imported from previous javascript, as a JSON hack

//load core database
function loadCoreDatabase() {
  for (let i=0; i<DATABASE.length; i++) {    

      let newEntry = document.createElement("li");
      let newButton = document.createElement("button");
      let newTitle = document.createElement("div");

      newEntry.setAttribute("id", "song" + i);
      //newEntry.style.display = "none";
      newEntry.className = "search_list";
      newEntry.setAttribute("data-id", i);
      newEntry.setAttribute("data-author", DATABASE[i].author);
      newEntry.setAttribute("data-tempo", DATABASE[i].tempo);
      newEntry.setAttribute("data-sheet", DATABASE[i].sheet);
      newEntry.setAttribute("data-lyrics", remove_chord_lines(DATABASE[i].sheet));
      newEntry.addEventListener("click", addFromSearch);
      newEntry.addEventListener("dblclick", addSongToSetDblClick);

      newTitle.setAttribute("id", "song-title" + i);
      newTitle.className = "search_list_title";
      newTitle.innerText = DATABASE[i].title;

      //newButton.setAttribute("id", "song-button" + i);
      //newButton.className = "search_list_button";
      //newButton.innerText = "+";

      newEntry.appendChild(newTitle);
      //newEntry.appendChild(newButton);
      document.getElementById("search_results").appendChild(newEntry);
  }
}

function reloadDatabase() {
  dumpDatabase();
  loadCoreDatabase();
  loadPersonalDatabase();
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
      newEntry.setAttribute("data-lyrics", remove_chord_lines(song_database[i]
        .sheet));
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

function remove_chord_lines(raw_text) {
    var text = raw_text.split("\n");
    var newtext = ""

    for (let i=0; i<text.length; i++) {
        if (!chord_line(text[i])) {
            newtext = newtext + text[i] + "\n";
        }
    }
    return newtext;
}

reloadDatabase();
