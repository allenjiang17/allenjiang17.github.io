
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

//  newEntry.addEventListener("click", previewLyric);
  newEntry.addEventListener("click", (e) => {
    selectLyric(e);
  });

  newEntry.appendChild(newTitle);
  lyric_list.append(newEntry);

  makeDraggableList(lyric_list);
  renumberOnDrag(lyric_list);
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
  return targetElement;
}

function nextLyric() {
  if(Number(CURRENT_LYRIC) < 0) { return; }
  const lyric_list = document.getElementById('lyric_results')
  const current_list = lyric_list.getElementsByTagName("li");
  let lyric;
  if(CURRENT_LYRIC + 2 > current_list.length) {
    if(Number(CURRENT_SET_SONG_NO) + 1 < getSetLength()) {
      selectSong(Number(CURRENT_SET_SONG_NO) + 1);
      lyric = selectLyric(0);
    } else {
      // previewLyric(none);
      lyric = getCurrentLyric();
    }
  } else {
    lyric = selectLyric(Number(CURRENT_LYRIC) + 1);
  }
  if(CURRENT_LYRIC + 2 > current_list.length) { 
  } else {
    previewLyric(Number(CURRENT_LYRIC) + 1);
  }
  return lyric;
}

function previousLyric() {
  if(Number(CURRENT_LYRIC) < 0) { return; }
  let lyric;
  if(Number(CURRENT_LYRIC) == 0) {
    if(Number(CURRENT_SET_SONG_NO) > 0) {
      previewLyric(Number(CURRENT_LYRIC));
      selectSong(Number(CURRENT_SET_SONG_NO) - 1);
      lyric = selectLyric(getLyricLength() - 1);
    } else { lyric = getCurrentLyric(); }
    return lyric;
  } 
  previewLyric(Number(CURRENT_LYRIC));
  lyric = selectLyric(Number(CURRENT_LYRIC) - 1);
  return lyric;
}

function getCurrentLyric() {
  const lyric_list = document.getElementById('lyric_results')
  const current_list = lyric_list.getElementsByTagName("li");
  return current_list[CURRENT_LYRIC];
}

function selectCurrentLyricFromKeys(targetElement){
  unselectLyricList()
  const pres1 = document.getElementById('currpresentation_text');
  pres1.innerText = targetElement.getAttribute("lyric");
  setPresLyric(targetElement.getAttribute('lyric'));
  targetElement.classList.add("selected");

  CURRENT_LYRIC = targetElement.getAttribute("data-lyric-no");
}


function renumberOnDrag(lyriclist=document.getElementById('lyric_results')) {
  let items = lyriclist.getElementsByTagName("li")
  for (let item of items) {
    item.addEventListener('drop', () => {
      const ll = lyriclist.getElementsByTagName('li');
      for (let i = 0; i < ll.length; i++) {
        ll[i].setAttribute('data-lyric-no', i);
      }
    })
  }
}
