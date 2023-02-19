function initializeTempo() {
  const list = document.getElementById("main_search_results");
  const a = list.getElementsByTagName("li");
  let tempolist = []
  for (i = 0; i < a.length; i++) {
    let atempos = a[i].getAttribute("data-tempo");
    if(atempos.length > 100) {continue;}
    atempos = atempos.split(/\s*[,\s]\s*/i);
    for (j=0; j < atempos.length; j++) {
      let temp = atempos[j].replace(",", "").replace('.', '')
          .trim().toLowerCase();
      if(temp.length > 20 | temp.length < 1) {continue;}
      if(!tempolist.includes(temp)) {
        tempolist.push(temp);
      }
    }
  }
  const temposelect = document.getElementById('tempo_options');
  for(i=0; i < tempolist.length; i++) {
    let opt = document.createElement('option')
    opt.text = tempolist[i];
    opt.value = tempolist[i];
    temposelect.appendChild(opt);
  }
}
function mainSearch() {
  var tempo = document.getElementById("tempo_options").value.toLowerCase();
  filterFunction("main_search_bar", "main_search_results", tempo);
}

function mobileSearch() {
  filterFunction("mobile_search_bar", "mobile_search_results", "any");

}

function editLibrarySearch() {
  filterFunction("library_search_bar", "popup-personal_search_results", "any");

}

function filterFunction(input_id, list_id, filter) {
    var input = document.getElementById(input_id).value.toUpperCase();
    list = document.getElementById(list_id);
    a = list.getElementsByTagName("li");

    //secret able to search the authors
    if (input.includes("A:")) {
      input = input.slice(2);
      for (i = 0; i < a.length; i++) {
        txtValue = a[i].getAttribute("data-author");

        if (input.length == 0) {
              a[i].classList.add("hidden");
        } else {  
          if (txtValue.toUpperCase().indexOf(input) == 0){
            a[i].classList.remove("hidden");
          } else {
            a[i].classList.add("hidden");
          }
        }
      }
      
    } else {
    //search by title
      for (i = 0; i < a.length; i++) {
        txtValue = a[i].firstChild.textContent || a[i].firstChild.innerText;

          if (input.length == 1) {
              if (txtValue.toUpperCase().indexOf(input) == 0 &&
                ((a[i].getAttribute("data-tempo").toLowerCase().includes(filter) || 
                filter == "any") )) {
                  a[i].classList.remove("hidden");
                } else {
                a[i].classList.add("hidden");
              }
          } else {  
              if (txtValue.toUpperCase().indexOf(input) > -1 &&
                (a[i].getAttribute("data-tempo").toLowerCase().includes(filter) || 
                filter == "any")) {
                  a[i].classList.remove("hidden");
                } else {
                a[i].classList.add("hidden");
              }
            }
        
      }
    }
}

function selectSearchSong(id) {
  unselectSearchList();
  unselectSetList();
  CURRENT_SONG_ID = id;
  const songs = document.getElementById("main_search_results")
    .getElementsByTagName("li");
  let song = null; 
  for(const s of songs) {
    if(s.getAttribute('data-id') == id) {
      song = s;
    }
  }
  if(song !== null) {
    selectSong(song);
    song.classList.add('selected');
  }
  updateKey();
}

function addFromSearch() {
  //remove selected formatting from previous song
  unselectSearchList();
  unselectSetList();

  //change current ID song
  CURRENT_SONG_ID = this.getAttribute("data-id");

  //set the song
  selectSong(this);

  //add new selected formatting to selected song
  this.classList.add("selected");
 
  updateKey();
}

function addFromSearchMobile() {
  CURRENT_SONG_ID = this.getAttribute("data-id");
  document.getElementById("text_entry").value = this.getAttribute("data-sheet");
  //updateKey(); //mobile fails to recognize and enter into this function for some reason

  document.getElementById("mobile_search_bar").value = "";
  list = document.getElementById("mobile_search_results").getElementsByTagName("li");
  
  for (let i=0; i<list.length;i++) {
    list[i].classList.add("hidden");
  }

}

function shuffle() {
  const list_of_songs = document.getElementById("main_search_results")
    .getElementsByTagName("li");
  let newlist = []
  for(let i=0; i < list_of_songs.length; i++) {
    if(window.getComputedStyle(list_of_songs[i], null).display == "block") {
      newlist.push(list_of_songs[i]);
    }
  }
  const e = newlist[Math.floor(Math.random() * newlist.length)]
  unselectSearchList();
  unselectSetList();
  CURRENT_SONG_ID = e.getAttribute("data-id");
  selectSong(e);
  e.classList.add('selected')
  e.scrollIntoView({block: 'center', behavior: "smooth"})
  updateKey();
}

function unselectSearchList() {
  var list_of_songs = document.getElementById("main_search_results")
    .getElementsByTagName("li");
  for (let i=0; i<list_of_songs.length; i++) {
    list_of_songs[i].classList.remove("selected");
  }
}

/*
function changeSongsVisibility() {
  
  var songs_dashboard = document.getElementById("songs_dashboard");

  if (songs_dashboard.style.display == "none") {
    songs_dashboard.style.display = "block";
    document.getElementById("minimize_button_top").innerText = "–"
  } else {
    songs_dashboard.style.display= "none";
    document.getElementById("minimize_button_top").innerText = "+"
  }
}

function hideChords() {

  var button = document.getElementById("hideChords");
  var song = document.querySelector("#search_results > li[data-id='" +  String(CURRENT_SONG_ID) + "']"); 

  console.log(button.getAttribute("data-show"));


  if (button.getAttribute("data-show") == "yes") {
    
    document.getElementById("text_entry").value = song.getAttribute("data-lyrics");

    button.setAttribute("data-show", "no");
    button.innerHTML = 'Show Chords';
    
  } else {

    document.getElementById("text_entry").value = song.getAttribute("data-sheet");

    button.setAttribute("data-show", "yes");
    button.innerHTML = 'Hide Chords';

  }

}
*/

function changeSongsVisibility() {
  
  var tempo = document.getElementById("tempo_dashboard");
  var songs_dashboard = document.getElementById('search_bar_content');

  if (tempo.style.display == 'none') {
    songs_dashboard.style.maxHeight = '35vh';
    songs_dashboard.style.borderStyle = 'solid'
    tempo.style.display = "flex"
    window.setTimeout(function () {
        document.getElementById("minimize_button_top").innerText = "–"
    }, 700);
  } else {
    songs_dashboard.style.maxHeight = '0';
    window.setTimeout(function () {
        songs_dashboard.style.borderStyle = 'none'
        tempo.style.display = "none"
        document.getElementById("minimize_button_top").innerText = "+"
    }, 700);
  }
}
