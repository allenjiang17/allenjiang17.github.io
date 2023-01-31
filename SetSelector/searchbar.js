function filterFunction() {
    var input, filter, ul, li, a, i;
    input = document.getElementById("search_bar");
    filter = input.value.toUpperCase();
    list = document.getElementById("search_results");
    a = list.getElementsByTagName("li");

    var tempo = document.getElementById("tempo_options").value;

    //secret able to search the authors
    if (filter.includes("A:")) {
    
      filter = filter.slice(2);
      for (i = 0; i < a.length; i++) {
        txtValue = a[i].getAttribute("data-author");

        if (filter.length == 0) {
              a[i].style.display = "none";
    
        } else {  
          if (txtValue.toUpperCase().indexOf(filter) == 0){
            a[i].style.display = "block";
          } else {
            a[i].style.display = "none";
          }
      }
      }
      
    } else {
    //search by title
      for (i = 0; i < a.length; i++) {
      
        txtValue = a[i].firstChild.textContent || a[i].firstChild.innerText;

          if (filter.length == 1) {
              if (txtValue.toUpperCase().indexOf(filter) == 0 &&
                ((a[i].getAttribute("data-tempo").includes(tempo) || 
                tempo == "Any") )) {
                a[i].style.display = "block";
              } else {
                a[i].style.display = "none";
              }
          } else {  
              if (txtValue.toUpperCase().indexOf(filter) > -1 &&
              (a[i].getAttribute("data-tempo").includes(tempo) || tempo == "Any") ) {
                a[i].style.display = "block";
              } else {
                a[i].style.display = "none";
              }
            }
        
      }
    }
}

function addFromSearch() {
  //remove selected formatting from previous song
  unselectSearchList();
  unselectSetList();

  //change current ID song
  CURRENT_SONG_ID = this.getAttribute("data-id");

  //change text entry to reflect new song sheets
  document.getElementById("text_entry").value = this.getAttribute("data-sheet");

  //empty searchbar
  document.getElementById("search_bar").value = "";

  //add new selected formatting to selected song
  this.classList.add("selected");

  //update search, key
  filterFunction();
  updateKey();
}

function unselectSearchList() {
  var list_of_songs = document.getElementById("search_results")
  .getElementsByTagName("li");
for (let i=0; i<list_of_songs.length; i++) {
  list_of_songs[i].classList.remove("selected");
}
}

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



/*
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
