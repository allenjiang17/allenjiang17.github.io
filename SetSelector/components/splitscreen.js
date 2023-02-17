const splitscreenwindow = `
  <textarea id="splitscreentext" readonly spellcheck="false"></textarea>
`

function splitscreen() {
  const ss = document.getElementById("splitscreen")
  if (ss.style.visibility == "hidden") {
    ss.style.visibility = "visible";
  } else {
    ss.style.visibility = "hidden";
  }
}

function mirrorLyrics() {
  let text = document.getElementById("text_entry").value;
  for (let i=0; i < 40; i++) {
    text = text + "\n";
  }
  document.getElementById("splitscreentext").value = text; 
  mirrorScroll();
}

function mirrorScroll() {
  const text = document.getElementById("text_entry")
  document.getElementById("splitscreentext").scrollTop = 
      text.scrollTop + text.offsetHeight - 40;
  // 40 px overlap between the two
  // divide by text.scrollHeight is font size is different to get a percentage
}





function dragElement(elmnt) {
  var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
  if (document.getElementById(elmnt.id + "header")) {
    // if present, the header is where you move the DIV from:
    document.getElementById(elmnt.id + "header").onmousedown = dragMouseDown;
  } else {
    // otherwise, move the DIV from anywhere inside the DIV:
    elmnt.onmousedown = dragMouseDown;
  }

  function dragMouseDown(e) {
    e = e || window.event;
    e.preventDefault();
    // get the mouse cursor position at startup:
    pos3 = e.clientX;
    pos4 = e.clientY;
    document.onmouseup = closeDragElement;
    // call a function whenever the cursor moves:
    document.onmousemove = elementDrag;
  }

  function elementDrag(e) {
    e = e || window.event;
    e.preventDefault();
    // calculate the new cursor position:
    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;
    // set the element's new position:
    elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
    elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
  }

  function closeDragElement() {
    // stop moving when mouse button is released:
    document.onmouseup = null;
    document.onmousemove = null;
  }
}











// Initialize

function reloadSplitScreen() {
  document.getElementById("splitscreen").innerHTML = splitscreenwindow;
  document.getElementById("text_entry").addEventListener("input", mirrorLyrics);
  document.getElementById("text_entry").addEventListener("scroll", mirrorScroll);
  dragElement(document.getElementById("splitscreen"));
}
reloadSplitScreen();
