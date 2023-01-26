if(window.matchMedia("(prefers-color-scheme: dark)").matches) {
    const icon = document.querySelector("#nightmode");
    icon.src = "moon.svg"
}


function nightmode() {
    const mode = document.querySelector("#themeos");
    const mode2 = document.querySelector("#themetoggle");
    const icon = document.querySelector("#nightmode");
    if (icon.getAttribute('src') == "sun.svg") {
        mode.href = "styles.dark.css"
        mode2.href = "styles.dark.css"
        icon.src = "moon.svg"
    } else {
        mode.href = ""
        mode2.href = ""
        icon.src = "sun.svg"
    }
}

document.getElementById("nightmode").addEventListener("click", nightmode);
