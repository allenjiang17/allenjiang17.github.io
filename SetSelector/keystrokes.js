function executeKeyStrokes(e) {

  if (document.activeElement == document.getElementById("set_list")) {

    var set_list = document.getElementById("set_list_items");
    var set_list_array = [];

      let index = 0;
      let target_index;
      for (let set_item of set_list.childNodes) {          
          set_list_array[index] = set_item;
          if (set_item.classList.contains("selected")) {
              target_index = index;
          }
          index++;
      }
      //up arrow
      if (e.keyCode == "38" && target_index > 0) {
          selectCurrentSong(set_list_array[target_index-1]);
          e.preventDefault();
      //down arrow
      } else if (e.keyCode == "40" && target_index < index) {
          selectCurrentSong(set_list_array[target_index+1]);
          e.preventDefault();
      } 
  } else if (document.activeElement == 
    document.getElementById("lyrics_dashboard")){
    //up arrow
    if (e.keyCode == "38") {
//      selectCurrentLyricFromKeys(lyric_list_array[target_index-1]);
//        e.preventDefault();
      previousLyric();
    //down arrow
    } else if (e.keyCode == "40") {
//      selectCurrentLyricFromKeys(lyric_list_array[target_index+1]);
//        e.preventDefault();
      nextLyric();
    } 

  }
  
}

document.onkeydown = executeKeyStrokes;
