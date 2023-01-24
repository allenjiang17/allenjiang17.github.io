const downloadToPPT = (content, filename) => {
    var pres = new PptxGenJS();
    for (let i=0; i<content.length; i++) {
        var lyrics = splitLyrics(content[i])
        for (let j=0; j<lyrics.length; j++) {
            var slide = pres.addSlide();
            slide.background = { color: "111111" }; 
            slide.addText(lyrics[j], {
                align: "center", 
                color: "FFFFFF", 
                // Default 16x9 size is 10 x 5.625 in
                x: 1, // slide width minus text width divided by 2
                y: 1,
                h: 3.625,
                w: 8,
            });
        }
    }
    pres.writeFile({ fileName: filename });
};


function downloadPPT() {
    var set_list = document.querySelector('#set_list_items');
    var list_of_songs = set_list.getElementsByTagName("li");
    var export_songs = []

    for (let i=0; i<list_of_songs.length; i++) {
        export_songs[i] = remove_chord_lines(list_of_songs[i].getAttribute("data-sheet"));
    }

    var today = new Date();
    var date = String(today.getMonth() + 1).padStart(2, '0') + 
        String(today.getDate()).padStart(2, '0') + String(today.getFullYear()).substring(2);
    downloadToPPT(export_songs, 'set' + date + '.pptx');
}

/* Splits lyrics string into multiple chunks based on newlines
 *
 * @return list of strings
 */
function splitLyrics(lyrics) {
    lyrics = lyrics.split('\n')
    lyrics.push('') // add empty string so no need for ending statement
    var nlyrics = new Array();
    var currlyric = "";
    var empty = true
    for (let i=0; i < lyrics.length; i++) {
        var l = lyrics[i].trim()
        const regex = new RegExp(/^\[.*\]$/);
        const regex2 = new RegExp('^TEMPO:')
        if(regex.test(l) | regex2.test(l)) {
            console.log(l)
            l = ""
        }
        if(l) {
            if(empty) {
                currlyric = l
            } else {
                currlyric = currlyric + '\n' + l
            }
            empty = false
        } else if(!empty){
            nlyrics.push(currlyric)
            currlyric = "";
            empty = true
        }
    }
    return nlyrics;
}

document.getElementById("ppt_button").addEventListener("click", downloadPPT)
