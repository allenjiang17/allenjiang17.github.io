
function nightmode() {
    const mode = document.querySelector("#theme");
    const icon = document.querySelector("#nightmode");
    if (mode.getAttribute('href') == "styles.css") {
        mode.href = "styles.dark.css"
        icon.src = "moon.svg"
    } else {
        mode.href = "styles.css"
        icon.src = "sun.svg"
    }
}

document.getElementById("nightmode").addEventListener("click", nightmode);
