//global variables
//var DATABASE imported from previous javascript, as a JSON hack
var CURRENT_SONG_ID;

//load database
for (let i=0; i<DATABASE.length; i++) {    

    var newEntry = document.createElement("li");
    var newButton = document.createElement("button");
    var newTitle = document.createElement("div");

    newEntry.setAttribute("id", "song" + i);
    //newEntry.style.display = "none";
    newEntry.className = "search_list";
    newEntry.setAttribute("data-id", i);
    newEntry.setAttribute("data-author", DATABASE[i].author);
    newEntry.setAttribute("data-tempo", DATABASE[i].tempo);
    newEntry.addEventListener("click", addFromSearch);

    newTitle.setAttribute("id", "song-title" + i);
    newTitle.className = "search_list_title";
    newTitle.innerText = DATABASE[i].title;

    //newButton.setAttribute("id", "song-button" + i);
    //newButton.className = "search_list_button";
    //newButton.innerText = "+";

    newEntry.appendChild(newTitle);
    //newEntry.appendChild(newButton);
    document.getElementById("search_results").appendChild(newEntry);



}

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

          if (filter.length == 0  && !document.getElementById("show_songs_box").checked) {
            a[i].style.display = "none";

          } else if (filter.length == 1) {
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

function showSongs() {

  var input, a, i;
  input = document.getElementById("search_bar");
  list = document.getElementById("search_results");
  a = list.getElementsByTagName("li");

  if (document.getElementById("show_songs_box").checked) {
    for (i = 0; i < a.length; i++) {
      a[i].style.display = "block";
    }
  } else {
    for (i = 0; i < a.length; i++) {
      a[i].style.display = "none";
    }

  }

}