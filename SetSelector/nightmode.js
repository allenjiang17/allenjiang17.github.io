if(window.matchMedia("(prefers-color-scheme: dark)").matches) {
    const icon = document.querySelector("#nightmode");
    icon.src = "icons/moon.svg"
}


function nightmode() {
    const mode = document.querySelector("#themeos");
    const mode2 = document.querySelector("#themetoggle");
    const icon = document.querySelector("#nightmode");
    if (icon.getAttribute('src') == "icons/sun.svg") {
        mode.href = "styles/styles.dark.css"
        mode2.href = "styles/styles.dark.css"
        icon.src = "icons/moon.svg"
    } else {
        mode.href = ""
        mode2.href = ""
        icon.src = "icons/sun.svg"
    }
}

document.getElementById("nightmode").addEventListener("click", nightmode);
