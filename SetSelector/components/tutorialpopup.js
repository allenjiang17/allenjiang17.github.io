const tutorialpopup = `
  <div class="popup-background" id="popupbackgroundtut"
    onclick="closetutorialpopup()"></div>
  <!--
  <div class="tutorialpanel" id="tutorialpanel1">
    <div class="tutorialnav"></div>
  </div>
  <div class="tutorialpanel" id="tutorialpanel2">
    <div class="tutorialnav"></div>
  </div>
  <div class="tutorialpanel" id="tutorialpanel3">
    <div class="tutorialnav"></div>
  </div>
  -->
`

const tutorialnav = `
`

function navtut(n) {
  tempid = "tutorialpanel" + n;
  for (let node of document.getElementsByClassName('tutorialpanel')) 
    node.style.display = "none";
  document.getElementById(tempid).style.display = "block";
}

function opentutorialpopup() {
  document.getElementById("tutorialpopupplaceholder").style.display = "block";
  document.getElementById("popupbackgroundtut").style.display = "block";
}
function closetutorialpopup() {
  document.getElementById("tutorialpopupplaceholder").style.display = "none";
}


function reloadTut() {
  document.getElementById("tutorialpopupplaceholder").innerHTML = tutorialpopup;
  for (let node of document.getElementsByClassName('tutorialnav')) 
    node.innerHTML = tutorialnav;
}

reloadTut(); 
