
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

  newEntry.addEventListener("click", previewCurrentLyric);
  newEntry.addEventListener("dblclick", selectCurrentLyric);

  newEntry.appendChild(newTitle);
  lyric_list.append(newEntry);

  makeDraggableList(lyric_list);
}

function clearLyrics() {
  let lyric_list = document.getElementById("lyric_results")
      .getElementsByTagName("li");;
  for (let i=lyric_list.length -1; i >= 0; --i) {
      lyric_list[i].remove()
  }
}

function unselectLyricList() {
    var list_of_songs = document.getElementById("lyric_results")
        .getElementsByTagName("li");
    for (let i=0; i<list_of_songs.length; i++) {
        list_of_songs[i].classList.remove("selected");
    }
}

function previewCurrentLyric() {
  const pres = document.getElementById('nextpresentation_text');
  pres.innerText = this.getAttribute("lyric");
  //TODO set global variable values to keep track of current lyric and next lyric
}

function selectCurrentLyric() {
  unselectLyricList()
  const pres1 = document.getElementById('currpresentation_text');
  pres1.innerText = this.getAttribute("lyric");
  this.classList.add("selected");
  //TODO set global variable values to keep track of current lyric and next lyric
}
