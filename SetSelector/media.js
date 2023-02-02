
function switchMedia() {
  const chords = document.getElementById("chord_display")
  const media = document.getElementById("media_display")
  const transition = document.getElementById('transition_display')
  const transition2 = document.getElementById('fakepresentation')

  if (media.style.display == "flex") {
    document.getElementById("chord_toggle").classList.add("selected");
    document.getElementById("media_toggle").classList.remove("selected");

    media.style.display = "none"
    transition.style.opacity = "1"
    transition.classList.toggle('media')
    transition2.classList.toggle('media')
    window.setTimeout(function () {
      transition.style.opacity = "0"
      chords.style.display = "block"
    }, 700);
  } else {

    document.getElementById("media_toggle").classList.add("selected");
    document.getElementById("chord_toggle").classList.remove("selected");

    chords.style.display = "none"
    transition.style.opacity = "1"
    transition.classList.toggle('media')
    transition2.classList.toggle('media')
    window.setTimeout(function () {
      transition.style.opacity = "0"
      media.style.display = "flex"
    }, 700);
  }
}

function toggleFullscreen() {
  if(presentwindow == null) { presentMedia(); }
  else {}
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
    <div id="displaypresentation" class='presentation' 
      style="font-family:Century Gothic, Helvetica, serif;
      height:100vh;width:100vw;background:black;
      text-align:center;padding-top:6vh;cursor:none;">
      <span id="displaypresentation_text" 
        style="color:white;font-size:4vh;line-height:6vh;opacity:1;">
      </span>
    </div>
  `
  presentwindow = windowobj;
  windowobj.onbeforeunload = presentWindowDestructor;
  presentWindowConstructor();
}

function presentWindowConstructor() {
  presentwindow.document.getElementById('displaypresentation_text')
    .innerText = document.querySelector("#lyric_results > li[data-lyric-no='" 
      +  String(CURRENT_LYRIC) + "']").getAttribute("lyric");
  if(SCREEN_HIDDEN) {setPresBlack(false)}
}

function presentWindowDestructor() {
  console.log('cancel presentation')
  presentwindow = null;
}

function setPresLyric(lyric) {
  if(presentwindow == null) { console.log("No Window"); return; }
  presentwindow.document.
      getElementById('displaypresentation_text').innerText = lyric;
}

function setPresBlack(turnon) {
  if(presentwindow == null) { return; }
  pres = presentwindow.document.getElementById('displaypresentation_text');
  if(turnon) { pres.style.opacity = "1" }
  else { pres.style.opacity = "0" }
}

function blackScreen() {
  const pres1 = document.getElementById('currpresentation_text');
  if(SCREEN_HIDDEN) {
    pres1.style.opacity = '1';
    setPresBlack(true);
    SCREEN_HIDDEN = false;
  } else {
    pres1.style.opacity = '0.2';
    setPresBlack(false);
    SCREEN_HIDDEN = true;
  }
}
