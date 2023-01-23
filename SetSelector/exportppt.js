const downloadToPPT = (content, filename) => {
    var pres = new pptxgen.pptxgen();
    var slide = pres.addSlide();
};


function downloadPPT() {
    var set_list = document.querySelector('#set_list_items');
    var list_of_songs = set_list.getElementsByTagName("li");
    var export_songs = []


    for (let i=0; i<list_of_songs.length; i++) {
        export_songs[i] = remove_chord_lines(list_of_songs[i])
    }

//    today = new Date();
//    var date = String(today.getMonth() + 1).padStart(2, '0') + 
//        String(today.getDate()).padStart(2, '0') + String(today.getFullYear()).substring(2);
//    downloadToPPT(export_songs, 'set' + date + '.pptx');
}

document.getElementById("ppt_button").addEventListener("click", downloadPPT)

function remove_chord_lines(raw_text) {
    var text = raw_text.split("\n");
    var newtext = ""

    for (let i=0; i<text.length; i++) {
        if (!chord_line(text[i])) {
            newtext = newtext + text[i]
        }
    }
    return newtext;
}

function chord_line(line) {
    /*combination of several factors:
    #1. presence of excluded characters (less likely to be chords)
    #2. presense of lots of spaces (more likely to be chords)
    #3. presence of lots of upper cases (more likely to be chords)*/

    const excluded_characters = ["h","i","j","k","l","n","o","p","q","r","s","t","u","v","x","y","z"];
    const chord_characters = ["#", "7", "/"];

    var upper_count = 0;
    var lower_count = 0;
    var space_count = 0;
    var letter_count = 0;
    var excluded_count = 0;
    var chord_count = 0;

    for (let i=0; i<line.length; i++) {
    
        //spaces
        if (line[i] == " ") {
            space_count += 1;
        } else if ((/[a-zA-Z1-9]/).test(line[i])) {
            letter_count += 1;
        }

        //upper case
        if (line[i] = line[i].toUpperCase()) {
            upper_count += 1;
        } else if (line[i] = line[i].toLowerCase()) {
            lower_count += 1;
        }

        //excluded characters
        if (excluded_characters.includes(line[i].toLowerCase())){
            excluded_count += 1;
        } else if (chord_characters.includes(line[i].toLowerCase())) {
            chord_count += 1;
         }

    }

    if (letter_count == 0) {
        return false;
    }

    //heuristic formula for determining likelihood of chord line
    var score = (upper_count - lower_count) + (space_count - letter_count) - 4 * excluded_count + chord_count;

    if (score >= -2) {
        return true;
    } else {
        return false
    }

}
