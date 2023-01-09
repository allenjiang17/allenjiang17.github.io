var CURRENT_SET_SONG_NO;

function addSongToSet() {

    var set_list = document.getElementById("set_list_items");
    var current_list = set_list.getElementsByTagName("li");

    var newEntry = document.createElement("li");
    var newTitle = document.createElement("div");
    var newButton = document.createElement("button");

    newEntry.setAttribute("id", "set_item" + current_list.length);
    newEntry.setAttribute("data-song-no", current_list.length);
    newEntry.setAttribute("data-id", CURRENT_SONG_ID);
    newEntry.setAttribute("data-key", KEY);
    newEntry.setAttribute("data-sheet", document.getElementById("text_entry").value);
    newEntry.className = "set_list_item";
    newEntry.addEventListener("click", refreshCurrentSong);

    newTitle.setAttribute("id", "set_title" + current_list.length);
    newTitle.className = "set_title";
    newTitle.innerText = DATABASE[CURRENT_SONG_ID].title + " (" + KEY + ")";

    newButton.setAttribute("id", "set_button" + current_list.length);
    newButton.className = "set_delete";
    newButton.innerText = "-";
    newButton.addEventListener("click", deleteSetSong);

    newEntry.appendChild(newTitle);
    newEntry.appendChild(newButton);
     set_list.append(newEntry);
}

function refreshCurrentSong() {
    currElement = this;

    //remove highlights from other songs
    var list_of_songs = currElement.parentElement.getElementsByTagName("li");
    
    for (let i=0; i<list_of_songs.length; i++) {
        list_of_songs[i].style.backgroundColor = "#f6f6f6";
        list_of_songs[i].firstChild.style.color = "black";
        list_of_songs[i].firstChild.style.fontWeight = "normal"
    }

    //TODO: if button is clicked, don't do the following for redundancy
    CURRENT_SONG_ID = currElement.getAttribute("data-id");
    CURRENT_SET_SONG_NO = currElement.getAttribute("data-song-no");
    document.getElementById("text_entry").value = currElement.getAttribute("data-sheet");
    updateKey();

    //change style to indicate selected song
    currElement.style.backgroundColor = "rgb(52, 86, 139)";
    currElement.firstChild.style.color = "white";
    currElement.firstChild.style.fontWeight = "bold";
}

//TODO: combine both functions somehow
function refreshCurrentSongFromArrowKeys(set_item_id) {

   var currElement = document.getElementById(set_item_id);
   if (currElement === undefined || currElement === null) {
        return;
   }

    //remove highlights from other songs
    var list_of_songs = currElement.parentElement.getElementsByTagName("li");
    
    for (let i=0; i<list_of_songs.length; i++) {
        list_of_songs[i].style.backgroundColor = "#f6f6f6";
        list_of_songs[i].firstChild.style.color = "black";
        list_of_songs[i].firstChild.style.fontWeight = "normal"
    }

    //TODO: if button is clicked, don't do the following for redundancy
    CURRENT_SONG_ID = currElement.getAttribute("data-id");
    CURRENT_SET_SONG_NO = currElement.getAttribute("data-song-no");
    document.getElementById("text_entry").value = currElement.getAttribute("data-sheet");
    updateKey();

    //change style to indicate selected song
    currElement.style.backgroundColor = "rgb(52, 86, 139)";
    currElement.firstChild.style.color = "white";
    currElement.firstChild.style.fontWeight = "bold";
}

function deleteSetSong() {
    currElement.parentElement.remove();
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
        
        export_string = export_string + "\n" + list_of_songs[i].getAttribute("data-sheet");

        
    }
    today = new Date();
    var date = String(today.getMonth() + 1).padStart(2, '0') + String(today.getDate()).padStart(2, '0') + String(today.getFullYear()).substring(2);
    downloadToFile(export_string, 'set' + date + '.txt', 'text/plain');

}

function checkKey(e) {

    if (document.activeElement == document.getElementById("set_list")) {

        console.log("focused");
        //up arrow
        if (e.keyCode == "38") {
            var set_item_id = "set_item" + String(parseInt(CURRENT_SET_SONG_NO) - 1);
            e.preventDefault();
            
        //down arrow
        } else if (e.keyCode == "40") {
            var set_item_id = "set_item" + String(parseInt(CURRENT_SET_SONG_NO) + 1);
            e.preventDefault();

        } 
        refreshCurrentSongFromArrowKeys(set_item_id);

    }   
}


document.querySelector('#export_button').addEventListener('click', downloadSet);
document.onkeydown = checkKey;
