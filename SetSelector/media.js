function switchMedia() {
  const chords = document.getElementById("chord_display")
  const media = document.getElementById("media_display")
  const transition = document.getElementById('transition_display')
  const transition2 = document.getElementById('fakepresentation')

  if (media.style.display == "block") {
    media.style.display = "none"
    transition.style.opacity = "1"
    transition.classList.toggle('media')
    transition2.classList.toggle('media')
    window.setTimeout(function () {
      transition.style.opacity = "0"
      chords.style.display = "block"
      document.getElementById('media_button').src = "icons/projector-fill.svg"
      document.getElementById("media_button_text").innerHTML = "Switch to media mode"
    }, 700);
  } else {
    chords.style.display = "none"
    transition.style.opacity = "1"
    transition.classList.toggle('media')
    transition2.classList.toggle('media')
    window.setTimeout(function () {
      transition.style.opacity = "0"
      media.style.display = "block"
      document.getElementById('media_button').src = "icons/music-note-list.svg"
      document.getElementById("media_button_text").innerHTML = "Switch to chord mode"
    }, 700);
  }
}
