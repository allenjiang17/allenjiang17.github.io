function switchMedia() {
  const chords = document.getElementById("chord_display")
  const media = document.getElementById("media_display")
  if (media.style.display == "block") {
    chords.style.display = "block"
    media.style.display = "none"
    document.getElementById('media_button').src = "projector-fill.svg"
    document.getElementById("media_button_text").innerHTML = "Switch to media mode"
  } else {
    chords.style.display = "none"
    media.style.display = "block"
    document.getElementById('media_button').src = "music-note-list.svg"
    document.getElementById("media_button_text").innerHTML = "Switch to chord mode"
  }
}
