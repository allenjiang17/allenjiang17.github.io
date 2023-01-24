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
    newEntry.setAttribute("data-sheet", DATABASE[i].sheet);
    newEntry.setAttribute("data-lyrics", remove_chord_lines(DATABASE[i].sheet));
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


function remove_chord_lines(raw_text) {
    var text = raw_text.split("\n");
    var newtext = ""

    for (let i=0; i<text.length; i++) {
        if (!chord_line(text[i])) {
            newtext = newtext + text[i] + "\n";
        }
    }
    return newtext;
}