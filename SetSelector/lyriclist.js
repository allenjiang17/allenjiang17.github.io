
function addLyricToList(lyric) {
  const lyric_list = document.getElementById('lyric_results')
  let current_list = lyric_list.getElementsByTagName("li");

  let newEntry = document.createElement("li");
  let newTitle = document.createElement("div");

  newEntry.setAttribute("id", "lyric_item" + current_list.length);
  newEntry.setAttribute("data-lyric-no", current_list.length);
  newEntry.setAttribute("lyric", lyric);
  newEntry.className = "lyric_list";

  newTitle.setAttribute("id", "lyric_title" + current_list.length);
  newTitle.className = "lyric_title";
  newTitle.innerText = lyric;

  newEntry.addEventListener("click", previewLyric);
  newEntry.addEventListener("dblclick", selectLyric);

  newEntry.appendChild(newTitle);
  lyric_list.append(newEntry);

  makeDraggableList(lyric_list);
}

function clearLyrics() {
  let lyric_list = document.getElementById("lyric_results")
      .getElementsByTagName("li");
  for (let i=lyric_list.length -1; i >= 0; --i) {
      lyric_list[i].remove()
  }
}

function getLyricLength() {
  return(document.getElementById("lyric_results").getElementsByTagName("li").length);
}

function unselectLyricList() {
    var list_of_songs = document.getElementById("lyric_results")
        .getElementsByTagName("li");
    for (let i=0; i<list_of_songs.length; i++) {
        list_of_songs[i].classList.remove("selected");
    }
}

function previewLyric(e=this) {
  let targetElement;
  const pres = document.getElementById('nextpresentation_text');
  if(typeof(e) == "number") {
    const lyric_list = document.getElementById('lyric_results')
    let current_list = lyric_list.getElementsByTagName("li");
    targetElement = current_list[e]
  } else {
    targetElement = e.currentTarget;
  }
  pres.innerText = targetElement.getAttribute("lyric");
}

function selectLyric(e=this) {
  let targetElement;
  const pres1 = document.getElementById('currpresentation_text');
  if(typeof(e) == "number") {
    const lyric_list = document.getElementById('lyric_results')
    const current_list = lyric_list.getElementsByTagName("li");
    targetElement = current_list[e]
  } else {
    targetElement = e.currentTarget;
  }
  unselectLyricList()
  pres1.innerText = targetElement.getAttribute("lyric");
  setPresLyric(targetElement.getAttribute('lyric'));
  targetElement.classList.add("selected");
  //targetElement.scrollIntoView();

  CURRENT_LYRIC = Number(targetElement.getAttribute("data-lyric-no"));
}

function nextLyric() {
  if(Number(CURRENT_LYRIC) < 0) { return; }
  const lyric_list = document.getElementById('lyric_results')
  const current_list = lyric_list.getElementsByTagName("li");
  if(CURRENT_LYRIC + 2 > current_list.length) {
    if(Number(CURRENT_SET_SONG_NO) + 1 < getSetLength()) {
      selectSong(Number(CURRENT_SET_SONG_NO) + 1);
      selectLyric(0);
    } else {
      // previewLyric(none);
    }
  } else {
    selectLyric(Number(CURRENT_LYRIC) + 1);
  }
  if(CURRENT_LYRIC + 2 > current_list.length) { 
  } else {
    previewLyric(Number(CURRENT_LYRIC) + 1);
  }
}

function previousLyric() {
  if(Number(CURRENT_LYRIC) < 0) { return; }
  if(Number(CURRENT_LYRIC) == 0) {
    if(Number(CURRENT_SET_SONG_NO) > 0) {
      previewLyric(Number(CURRENT_LYRIC));
      selectSong(Number(CURRENT_SET_SONG_NO) - 1);
      selectLyric(getLyricLength() - 1);
    }
    return;
  } 
  previewLyric(Number(CURRENT_LYRIC));
  selectLyric(Number(CURRENT_LYRIC) - 1);
}

function selectCurrentLyricFromKeys(targetElement){
  unselectLyricList()
  const pres1 = document.getElementById('currpresentation_text');
  pres1.innerText = targetElement.getAttribute("lyric");
  setPresLyric(targetElement.getAttribute('lyric'));
  targetElement.classList.add("selected");

  CURRENT_LYRIC = targetElement.getAttribute("data-lyric-no");
}

function editLyricsPopUp() {
  document.getElementById("popup-editlyrics").style.display = "block";
  document.getElementById("popup-background").style.display = "block";
  document.getElementById("popup-background").style.zIndex = 12;
  document.getElementById("edit_lyrics_input").value = 
  document.querySelector("#set_list_items > li[data-song-no='" + 
    String(CURRENT_SET_SONG_NO) + "']").getAttribute("data-lyrics");
}

function closeEditLyricsPopUp() {
  document.getElementById("popup-editlyrics").style.display = "none";
  document.getElementById("popup-background").style.display = "none";
  document.getElementById("popup-background").style.zIndex = 10;
}

function editLyrics() {
  //TODO: make this persist longer in local storage, as refreshing the page will lose this 
  var target_node = document.querySelector("#set_list_items > li[data-song-no='" +  String(CURRENT_SET_SONG_NO) + "']");
  target_node.setAttribute("data-lyrics", document.getElementById("edit_lyrics_input").value);
  clearLyrics();
  selectCurrentSong(target_node);

  closeEditLyricsPopUp();
}
