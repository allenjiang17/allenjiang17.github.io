// Initialization

loadSet();


// Functions

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
    newEntry.setAttribute("data-lyrics", document
      .querySelector("#main_search_results > li[data-id='" + 
        String(CURRENT_SONG_ID) + "']").getAttribute("data-lyrics"));
    newEntry.setAttribute("title", document
      .querySelector("#main_search_results > li[data-id='" +
      String(CURRENT_SONG_ID) + "']").firstChild.innerText);
    newEntry.className = "set_list_item";
    newEntry.addEventListener("click", selectCurrentSongFromClick);

    newTitle.setAttribute("id", "set_title" + current_list.length);
    newTitle.className = "set_title";
    newTitle.innerText = document
      .querySelector("#main_search_results > li[data-id='" + 
        String(CURRENT_SONG_ID) + "']").firstChild.innerText + " (" + KEY + ")";

    newButton.setAttribute("id", "set_button" + current_list.length);
    newButton.setAttribute("src", "icons/x-lg.svg");
    newButton.className = "set_delete";
    newButton.addEventListener("click", deleteSetSong);

    newEntry.appendChild(newTitle);
    newEntry.appendChild(newButton);
    set_list.append(newEntry);

    makeDraggableList();
    saveSet();
}

function addSongToSetDblClick(){
  // basically the same as addFromSearch in searchbar.js, to add it first 
  // into the text-entry
  CURRENT_SONG_ID = this.getAttribute("data-id");
  document.getElementById("text_entry").value = this.getAttribute("data-sheet");
  document.getElementById("main_search_bar").value = "";
  mainSearch(); //refresh search results
  updateKey();

  // once added to text-entry, use the normal function to add from 
  // text-entry into set
  addSongToSet();
}

function unselectSetList() {
    var list_of_songs = document.getElementById("set_list_items")
        .getElementsByTagName("li");
    for (let i=0; i<list_of_songs.length; i++) {
        list_of_songs[i].classList.remove("selected");
    }
}

function getSetLength() {
    return(document.getElementById("set_list_items")
        .getElementsByTagName("li").length)
}

function selectSong(e) {
  let targetElement;
  if(typeof(e) == "number") {
      const lyric_list = document.getElementById('set_list_items')
      let current_list = lyric_list.getElementsByTagName("li");
      if(e < current_list.length & e >= 0) {
          targetElement = current_list[e]
      } else {
          return;
      }
  } else if(e.hasAttribute('data-sheet')) { 
    // probably came from searchbar; is an html element
    if(!e.hasAttribute('data-song-no')) { e.setAttribute("data-song-no", -2); }
    targetElement = e;
  } else { // Mouse click event
      targetElement = e.currentTarget;
  }
  selectCurrentSong(targetElement);
}

function selectCurrentSong(targetElement) {
    unselectSetList();
    unselectSearchList();

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
    mirrorLyrics();
    targetElement.classList.add("selected");
}

//necessary because the default parameter passed into an event handing function is the event, not the target object, which is referenced by "this"
function selectCurrentSongFromClick() {
    selectCurrentSong(this);
}
    
function deleteSetSong() {
  this.parentElement.remove();
  saveSet();
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

function loadSet(set=null) {
  if(set == null) {
    set = getLocalSet();
  }
  const set_list = document.getElementById('set_list_items')
  set.forEach((s, i) => {
    let newEntry = document.createElement("li");
    let newTitle = document.createElement("div");
    let newButton = document.createElement("img");

    let cll = s['data-song-no'];
    let csi = s['data-id'];

    newEntry.setAttribute("id", "set_item" + cll);
    newEntry.setAttribute("data-song-no", cll);
    newEntry.setAttribute("data-id", csi);
    newEntry.setAttribute("data-key", s['data-key']);
    newEntry.setAttribute("data-sheet", s['data-sheet']);
    newEntry.setAttribute("data-lyrics", s['data-lyrics']);
    newEntry.setAttribute("title", s['title']);
    newEntry.className = "set_list_item";
    newEntry.addEventListener("click", selectCurrentSongFromClick);

    newTitle.setAttribute("id", "set_title" + cll);
    newTitle.className = "set_title";
    newTitle.innerText = s['title'] + " (" + 
        s['data-key'] + ")";

    newButton.setAttribute("id", "set_button" + cll);
    newButton.setAttribute("src", "icons/x-lg.svg");
    newButton.className = "set_delete";
    newButton.addEventListener("click", deleteSetSong);

    newEntry.appendChild(newTitle);
    newEntry.appendChild(newButton);
    set_list.append(newEntry);
  });
  makeDraggableList();
}

function saveSet() {
  const setlist = document.getElementById('set_list_items')
      .getElementsByTagName("li");
  let songs = [];
  for (const s of setlist) {
    let song = {};
    song['data-song-no'] = s.getAttribute('data-song-no');
    song['data-id'] = s.getAttribute('data-id');
    song['data-key'] = s.getAttribute('data-key');
    song['data-sheet'] = s.getAttribute('data-sheet');
    song['data-lyrics'] = s.getAttribute('data-lyrics');
    song['title'] = s.getAttribute('title');
    songs.push(song);
  }
  setLocalSet(songs);
}

function getLocalSet() {
  let set = JSON.parse(localStorage.getItem("setlist"));
  if(set == null | set == "[]") {return [];}
  return set;
}

function setLocalSet(songs) {
  localStorage.setItem("setlist", JSON.stringify(songs, null, 2));
}
