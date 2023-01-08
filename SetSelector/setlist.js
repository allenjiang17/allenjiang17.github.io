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

//from https://robkendal.co.uk/blog/2020-04-17-saving-text-to-client-side-file-using-vanilla-js
const downloadToFile = (content, filename, contentType) => {
    const a = document.createElement('a');
    const file = new Blob([content], {type: contentType});
    
    a.href= URL.createObjectURL(file);
    a.download = filename;
    a.click();
  
      URL.revokeObjectURL(a.href);
};


function downloadSet() {
    var set_list = document.querySelector('#set_list_items');
    var list_of_songs = set_list.getElementsByTagName("li");
    var export_string = "";

    for (let i=0; i<list_of_songs.length; i++) {
        
        export_string = export_string + "\n" + list_of_songs[i].firstChild.getAttribute("data-sheet");

        
    }
    today = new Date();
    var date = String(today.getMonth() + 1).padStart(2, '0') + String(today.getDate()).padStart(2, '0') + String(today.getFullYear()).substring(2);
    downloadToFile(export_string, 'set' + date + '.txt', 'text/plain');

}

document.querySelector('#export_button').addEventListener('click', downloadSet);

