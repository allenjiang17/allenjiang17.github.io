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
  document.getElementById("text_entry").value = DATABASE[CURRENT_SONG_ID].sheet;

  document.getElementById("search_bar").value = "";
  filterFunction();
  updateKey();
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