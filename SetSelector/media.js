function switchMedia() {
  const chords = document.getElementById("chord_display")
  const media = document.getElementById("media_display")
  if (media.style.display == "block") {
    chords.style.display = "block"
    media.style.display = "none"
  } else {
    chords.style.display = "none"
    media.style.display = "block"
  }
}
