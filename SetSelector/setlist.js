function addSongToSet() {
    var set_list = document.getElementById("set_list_items");
    var current_list = set_list.getElementsByTagName("li");

    var newEntry = document.createElement("li");
    var newTitle = document.createElement("div");
    var newButton = document.createElement("img");

    newEntry.setAttribute("id", "set_item" + current_list.length);
    newEntry.setAttribute("data-song-no", current_list.length);
    newEntry.setAttribute("data-id", CURRENT_SONG_ID);
    newEntry.setAttribute("data-key", KEY);
    newEntry.setAttribute("data-sheet", document.getElementById("text_entry").value);
    newEntry.setAttribute("data-lyrics", document.querySelector("#search_results > li[data-id='" +  String(CURRENT_SONG_ID) + "']").getAttribute("data-lyrics"));
    newEntry.className = "set_list_item";
    newEntry.addEventListener("click", selectCurrentSongFromClick);

    newTitle.setAttribute("id", "set_title" + current_list.length);
    newTitle.className = "set_title";
    newTitle.innerText = DATABASE[CURRENT_SONG_ID].title + " (" + KEY + ")";

    newButton.setAttribute("id", "set_button" + current_list.length);
    newButton.setAttribute("src", "icons/x-lg.svg");
    newButton.className = "set_delete";
    newButton.addEventListener("click", deleteSetSong);

    newEntry.appendChild(newTitle);
    newEntry.appendChild(newButton);
    set_list.append(newEntry);

    makeDraggableList();
}

function addSongToSetDblClick(){
  //basically the same as addFromSearch in searchbar.js, to add it first into the text-entry
  CURRENT_SONG_ID = this.getAttribute("data-id");
  document.getElementById("text_entry").value = this.getAttribute("data-sheet");
  document.getElementById("search_bar").value = "";
  filterFunction();
  updateKey();

  //once added to text-entry, use the normal function to add from text-entry into set
  addSongToSet();
}

function unselectSetList() {
    var list_of_songs = document.getElementById("set_list_items")
        .getElementsByTagName("li");
    for (let i=0; i<list_of_songs.length; i++) {
        list_of_songs[i].classList.remove("selected");
    }
}

function selectCurrentSong(targetElement) {
    unselectSetList();

    if (CURRENT_SET_SONG_NO != targetElement.getAttribute('data-song-no')) {
        CURRENT_SONG_ID = targetElement.getAttribute("data-id");
        CURRENT_SET_SONG_NO = targetElement.getAttribute("data-song-no");
        document.getElementById("text_entry").value = targetElement
            .getAttribute("data-sheet");
        updateKey();

        clearLyrics();
        const lyrics = splitLyrics(targetElement.getAttribute("data-lyrics"));
        for (let j=0; j<lyrics.length; j++) {
            addLyricToList(lyrics[j]);
        }
    }

    targetElement.classList.add("selected");
}

//necessary because the default parameter passed into an event handing function is the event, not the target object, which is referenced by "this"
function selectCurrentSongFromClick() {
    selectCurrentSong(this);
}
    
function deleteSetSong() {
    this.parentElement.remove();
}

//from: https://code-boxx.com/drag-drop-sortable-list-javascript/
function makeDraggableList(set_list=document.getElementById('set_list_items')) {
    
    // (A) SET CSS + GET ALL LIST ITEMS
    // var set_list = document.getElementById("set_list_items")
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

function executeKeyStrokes(e) {

  if (document.activeElement == document.getElementById("set_list")) {

    var set_list = document.getElementById("set_list_items");
    var set_list_array = [];

      let index = 0;
      let target_index;
      for (let set_item of set_list.childNodes) {          
          set_list_array[index] = set_item;
          if (set_item.classList.contains("selected")) {
              target_index = index;
          }
          index++;
      }
      //up arrow
      if (e.keyCode == "38" && target_index > 0) {
          selectCurrentSong(set_list_array[target_index-1]);
          e.preventDefault();
      //down arrow
      } else if (e.keyCode == "40" && target_index < index) {
          selectCurrentSong(set_list_array[target_index+1]);
          e.preventDefault();
      } 
  } else if (document.activeElement == document.getElementById("lyrics_dashboard")){
    var lyric_list = document.getElementById("lyric_results");
    var lyric_list_array = [];

    let index = 0;
    let target_index;
    for (let lyric_item of lyric_list.childNodes) {          
        lyric_list_array[index] = lyric_item;
        console.log(lyric_item);
        if (lyric_item.classList.contains("selected")) {
            target_index = index;
        }
        index++;
    }
    //up arrow
    if (e.keyCode == "38" && target_index > 0) {
      selectCurrentLyricFromKeys(lyric_list_array[target_index-1]);
        e.preventDefault();
    //down arrow
    } else if (e.keyCode == "40" && target_index < index) {
      selectCurrentLyricFromKeys(lyric_list_array[target_index+1]);
        e.preventDefault();
    } 

  }
  
}

document.onkeydown = executeKeyStrokes;

