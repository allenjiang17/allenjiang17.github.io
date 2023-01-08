function addSongToSet() {

    var set_list = document.getElementById("set_list_items");
    var current_list = set_list.getElementsByTagName("li");

    var newEntry = document.createElement("li");
    var newTitle = document.createElement("div");
    var newButton = document.createElement("button");

    newEntry.setAttribute("id", "set_item" + current_list.length);
    newEntry.setAttribute("data-id", CURRENT_SONG_ID);
    newEntry.className = "set_list_item";
    newEntry.addEventListener("click", refreshCurrentSong);

    newTitle.setAttribute("id", "set_title" + current_list.length);
    newTitle.className = "set_title";
    newTitle.innerText = DATABASE[CURRENT_SONG_ID].title + " (" + KEY + ")";
    newTitle.setAttribute("data-key", KEY);
    newTitle.setAttribute("data-sheet", document.getElementById("text_entry").value);

    newButton.setAttribute("id", "set_button" + current_list.length);
    newButton.className = "set_delete";
    newButton.innerText = "-";
    newButton.addEventListener("click", deleteSetSong);

    newEntry.appendChild(newTitle);
    newEntry.appendChild(newButton);
     set_list.append(newEntry);
}

function refreshCurrentSong() {

    //remove highlights from other songs
    var list_of_songs = this.parentElement.getElementsByTagName("li");
    
    for (let i=0; i<list_of_songs.length; i++) {
        list_of_songs[i].style.backgroundColor = "#f6f6f6";
        list_of_songs[i].firstChild.style.color = "black";
        list_of_songs[i].firstChild.style.fontWeight = "normal"
    }

    //TODO: if button is clicked, don't do the following for redundancy
    CURRENT_SONG_ID = this.getAttribute("data-id");
    document.getElementById("text_entry").value = this.firstChild.getAttribute("data-sheet");
    updateKey();

    //change style to indicate selected song
    this.style.backgroundColor = "rgb(52, 86, 139)";
    this.firstChild.style.color = "white";
    this.firstChild.style.fontWeight = "bold";
}

function deleteSetSong() {
    this.parentElement.remove();
}