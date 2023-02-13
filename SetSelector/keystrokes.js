function executeKeyStrokes(e) {
  const obj = document.activeElement;
  if (obj == document.getElementById("set_list")) {

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
  } else if(obj.tagName.toLowerCase() === 'textarea'){
    // is a text box
    return;
  } else {
    
      const lyricbox = document.getElementById('lyric_results');
      if (e.keyCode == "38") { //up arrow
        const lyric = previousLyric();
        e.preventDefault();
        if(lyric.offsetTop + lyric.clientHeight > lyricbox.scrollTop || 
          lyric.offsetTop + lyric.clientHeight < lyricbox.clientHeight) {
          lyric.scrollIntoView({behavior: "smooth", block: "center"});
        }
      } else if (e.keyCode == "40") { //down arrow
        const lyric = nextLyric();
        e.preventDefault();
        if(lyric.offsetTop + lyric.clientHeight > lyricbox.clientHeight || 
          lyric.offsetTop + lyric.clientHeight < lyricbox.scrollTop) {
          lyric.scrollIntoView({behavior: "smooth", block: "center"});
        }
      } 
  }
}

document.onkeydown = executeKeyStrokes;
