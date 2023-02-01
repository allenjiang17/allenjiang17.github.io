var presentwindow = null;

function switchMedia() {
  const chords = document.getElementById("chord_display")
  const media = document.getElementById("media_display")
  const transition = document.getElementById('transition_display')
  const transition2 = document.getElementById('fakepresentation')

  if (media.style.display == "flex") {
    media.style.display = "none"
    transition.style.opacity = "1"
    transition.classList.toggle('media')
    transition2.classList.toggle('media')
    window.setTimeout(function () {
      transition.style.opacity = "0"
      chords.style.display = "block"
      document.getElementById('media_button').src = "icons/projector-fill.svg"
      document.getElementById("media_button_text").innerHTML = "Switch to media mode"
    }, 700);
  } else {
    chords.style.display = "none"
    transition.style.opacity = "1"
    transition.classList.toggle('media')
    transition2.classList.toggle('media')
    window.setTimeout(function () {
      transition.style.opacity = "0"
      media.style.display = "flex"
      document.getElementById('media_button').src = "icons/music-note-list.svg"
      document.getElementById("media_button_text").innerHTML = "Switch to chord mode"
    }, 700);
  }
}

function presentMedia() {
  console.log('presenting!')
  let windowobj = window.open("", "worshipwindow", 
      "popup");
  windowobj.document.head.innerHTML = `
    <link rel="stylesheet" type="text/css" href="styles.css">
    <link rel="stylesheet" type="text/css" href="presentation.css">
  `
  windowobj.document.getElementsByTagName("body")[0].style = 
      "padding:0;margin:0;"

  windowobj.document.body.innerHTML = `
    <div id="displaypresentation" class='presentation' style="font-family:Times New Roman, Times, serif;height:100vh;width:100vw;background:black;text-align:center;display:table">
      <span id="displaypresentation_text" style="color:white;display:table-cell;vertical-align:middle;font-size:4vh;line-height:6vh;">
      </span>
    </div>
  `
  // windowobj.document.documentElement.requestFullscreen();
  //  "menubar=no,toolbar=no,location=no,status=no,resizeable")
  // On firefox, you need to set some stuff in about:config for these
  // to work perfectly;
  //
  // https://stackoverflow.com/questions/2909645/open-new-popup-window-without-address-bars-in-firefox-ie
  // browser.fullscreen.autohide
  // premissions.fullscreen.allowed
  presentwindow = windowobj;
  windowobj.onbeforeunload = function() {
      //store.dispatch('stoppresent', null);
  };

  presentwindow.document.getElementById('displaypresentation_text')
  .innerText =
  document.querySelector("#lyric_results > li[data-lyric-no='" +  String(CURRENT_LYRIC) + "']").getAttribute("lyric");
  console.log(CURRENT_LYRIC);
}

function setPresLyric(lyric) {
  try {
    presentwindow.document.
        getElementById('displaypresentation_text') .innerText = lyric;
  } catch (error) {
    console.error(error);
  }
}
function setPresBlack() {
}
