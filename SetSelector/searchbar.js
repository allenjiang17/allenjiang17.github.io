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
                  ((a[i].getAttribute("data-tempo").includes(tempo) || tempo == "Any") )) {
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
  CURRENT_SONG_ID = this.getAttribute("data-id");
  document.getElementById("text_entry").value = this.getAttribute("data-sheet");
  //DATABASE[CURRENT_SONG_ID].sheet;

  document.getElementById("search_bar").value = "";
  filterFunction();
  updateKey();
}


function addSongPopUp() {
  document.getElementById("popup-addsong").style.display = "block";
  document.getElementById("popup-background").style.display = "block";
  document.getElementById("song_sheet_input").value = document.getElementById("text_entry").value;
}

function closePopUp() {
  document.getElementById("popup-addsong").style.display = "none";
  document.getElementById("popup-background").style.display = "none";


}

function addSongSubmit() {
//TODO check if all fields have valid entries


  var song = new Object();
  song.title = document.getElementById("song_title_input").value;
  song.author = document.getElementById("song_author_input").value;
  song.tempo = document.getElementById("song_tempo_input").value;
  song.sheet = document.getElementById("song_sheet_input").value;


//check if database exists
if (localStorage.getItem("song_database") === null) {
    localStorage.setItem("song_database", JSON.stringify([]));
    console.log("Creating New Personal Song Database");
}

var song_database = JSON.parse(localStorage.getItem("song_database"));
song_database.push(song);
localStorage.setItem("song_database", JSON.stringify(song_database));
console.log(localStorage.getItem("song_database"));

//close popup
document.getElementById("popup-addsong").style.display = "none";
document.getElementById("popup-background").style.display = "none";

//location.reload();
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
  
  var songs_dashboard = document.getElementById("songs_dashboard");

  if (songs_dashboard.style.display == "none") {
    songs_dashboard.style.display = "block";
    document.getElementById("minimize_button_top").innerText = "–"
  } else {
    songs_dashboard.style.display= "none";
    document.getElementById("minimize_button_top").innerText = "+"


  }
}