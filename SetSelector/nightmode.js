// Initialization
if(window.matchMedia("(prefers-color-scheme: dark)").matches) {
    const icon = document.querySelector("#nightmode");
    icon.src = "icons/moon.svg"
}
initializeNMpref();


// Functions

function initializeNMpref() {
  const mode = document.querySelector("#themeos");
  const mode2 = document.querySelector("#themetoggle");
  const icon = document.querySelector("#nightmode");

  if(localStorage.getItem("nightmode") == "night") {
    if (icon.getAttribute('src') == "icons/sun.svg") {
      mode.href = "styles/styles.dark.css"
      mode2.href = "styles/styles.dark.css"
      icon.src = "icons/moon.svg"
    }
  } else if(localStorage.getItem("nightmode") == "day") {
    if (icon.getAttribute('src') == "icons/moon.svg") {
      mode.href = ""
      mode2.href = ""
      icon.src = "icons/sun.svg"
    }
  }
}

function nightmode() {
    const mode = document.querySelector("#themeos");
    const mode2 = document.querySelector("#themetoggle");
    const icon = document.querySelector("#nightmode");
    if (icon.getAttribute('src') == "icons/sun.svg") {
        mode.href = "styles/styles.dark.css"
        mode2.href = "styles/styles.dark.css"
        icon.src = "icons/moon.svg"
        localStorage.setItem("nightmode", 'night') 
    } else {
        mode.href = ""
        mode2.href = ""
        icon.src = "icons/sun.svg"
        localStorage.setItem("nightmode", 'day') 
    }
}

document.getElementById("nightmode").addEventListener("click", nightmode);
