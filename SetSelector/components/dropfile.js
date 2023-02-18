// Initialization stuff
document.body.addEventListener('dragover', dragoverfile)

reloadDropFile(); 

const dfhtml = `
<img src="">
`;


// Functions


function dropfile(e) {
}

function containsFiles(e) {
  let dt = e.dataTransfer;
  if(dt.types) {
    for(let i=0; i < dt.types.length; i++) {
      if(dt.types[i] == "Files") { return true; }
    }
  }
}

function dragoverfile(e) {
  if(containsFiles(e)) {
    dropfileplaceholder.style.display = "block";
  }
  // Stop when stop dragging
  e.preventDefault();
}


function reloadDropFile() {
  document.getElementById("dropfileplaceholder").innerHTML = dfhtml;
}

