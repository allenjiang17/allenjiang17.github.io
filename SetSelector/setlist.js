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
    newEntry.addEventListener("click", selectCurrentSongFromClick);

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

    makeDraggableList();
}

function selectCurrentSong(targetElement) {

    //remove highlights from other songs
    var list_of_songs = targetElement.parentElement.getElementsByTagName("li");
    
    for (let i=0; i<list_of_songs.length; i++) {
        list_of_songs[i].classList.remove("selected");
    }

    //TODO: if button is clicked, don't do the following for redundancy
    CURRENT_SONG_ID = targetElement.getAttribute("data-id");
    CURRENT_SET_SONG_NO = targetElement.getAttribute("data-song-no");
    document.getElementById("text_entry").value = targetElement.getAttribute("data-sheet");
    updateKey();

    //change style to indicate selected song
    targetElement.classList.add("selected");
}

//necessary because the default parameter passed into an event handing function is the event, not the target object, which is referenced by "this"
function selectCurrentSongFromClick() {
    selectCurrentSong(this);
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
        selectCurrentSong(document.getElementById(set_item_id));

    }   
}
//from: https://code-boxx.com/drag-drop-sortable-list-javascript/
function makeDraggableList () {
    
    // (A) SET CSS + GET ALL LIST ITEMS
    var set_list = document.getElementById("set_list_items")
    let set_list_items = set_list.getElementsByTagName("li")
    let current = null;
  
    // (B) MAKE ITEMS DRAGGABLE + SORTABLE
    for (let i of set_list_items) {
      // (B1) ATTACH DRAGGABLE
      i.draggable = true;
      
      // (B2) DRAG START - YELLOW HIGHLIGHT DROPZONES
      i.ondragstart = (ev) => {
        current = i;
        for (let it of set_list_items) {
          if (it != current) { it.classList.add("hint"); }
        }
      };
      
      // (B3) DRAG ENTER - RED HIGHLIGHT DROPZONE
      i.ondragenter = (ev) => {
        if (i != current) { i.classList.add("active"); }
      };
  
      // (B4) DRAG LEAVE - REMOVE RED HIGHLIGHT
      i.ondragleave = () => {
        i.classList.remove("active");
      };
  
      // (B5) DRAG END - REMOVE ALL HIGHLIGHTS
      i.ondragend = () => { for (let it of set_list_items) {
          it.classList.remove("hint");
          it.classList.remove("active");
      }};
   
      // (B6) DRAG OVER - PREVENT THE DEFAULT "DROP", SO WE CAN DO OUR OWN
      i.ondragover = (evt) => { evt.preventDefault(); };
   
      // (B7) ON DROP - DO SOMETHING
      i.ondrop = (evt) => {
        evt.preventDefault();
        if (i != current) {
          let currentpos = 0, droppedpos = 0;
          for (let it=0; it<set_list_items.length; it++) {
            if (current == set_list_items[it]) { currentpos = it; }
            if (i == set_list_items[it]) { droppedpos = it; }
          }
          if (currentpos < droppedpos) {
            i.parentNode.insertBefore(current, i.nextSibling);
          } else {
            i.parentNode.insertBefore(current, i);
          }
        }
      };
    }
  }


document.querySelector('#export_button').addEventListener('click', downloadSet);
document.onkeydown = checkKey;

