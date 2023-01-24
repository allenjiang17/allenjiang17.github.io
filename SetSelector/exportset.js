// TODO check if there are lines with too many characters.

function downloadSet() {

    var set_list = document.querySelector('#set_list_items');
    var list_of_songs = set_list.getElementsByTagName("li");
    var today = new Date();
    var date = String(today.getMonth() + 1).padStart(2, '0') + String(today.getDate()).padStart(2, '0') + String(today.getFullYear()).substring(2);
    var write_name = 'set' + date;

    //download as pdf
    if (document.getElementById("export_select").value == "pdf") {

        let songstringlist = [];
        for(let i=0; i<list_of_songs.length; i++) {
            songstringlist[i] = list_of_songs[i].getAttribute("data-sheet")
        }
        downloadToPDF(songstringlist, write_name + '.pdf')


    //download as ppt
    } else if (document.getElementById("export_select").value == "ppt") {
        let export_songs = []

        for (let i=0; i<list_of_songs.length; i++) {
            export_songs[i] = list_of_songs[i].getAttribute("data-lyrics");
        }
    
        downloadToPPT(export_songs, write_name +'.pptx');

    //download as plain text file
    } else {
        var intro_string = "PREPARE YOUR SET USING THE FOLLOWING:\n 1. Use a monospaced font to ensure spacing is right (e.g Courier)\n 2. Select all the set and format into two columns\n 3. Add page breaks into between songs\n";
        var export_string = "";

        for (let i=0; i<list_of_songs.length; i++) {
            export_string = export_string + "\n" + list_of_songs[i].getAttribute("data-sheet");
        }
    
        export_string = intro_string + export_string;
        downloadToTextFile(export_string, write_name + '.txt', 'text/plain');

    }


}
//from https://robkendal.co.uk/blog/2020-04-17-saving-text-to-client-side-file-using-vanilla-js
const downloadToTextFile = (content, filename, contentType) => {
    const a = document.createElement('a');
    const file = new Blob([content], {type: contentType});
    
    a.href= URL.createObjectURL(file);
    a.download = filename;
    a.click();
  
    URL.revokeObjectURL(a.href);
};

const downloadToPDF = (contentlist, filename) => {
    var doc = new jspdf.jsPDF();
    doc.setFont("SourceCodePro-Regular", "normal");
    doc.setFontSize(10);
    for (let i=0; i<contentlist.length; i++) {
        var songstr = contentlist[i]
        var songlines = songstr.split("\n")
        if (songlines.length > 68) {
            doc.text(songlines.slice(0, 67).join('\n'), 10, 20)
            if (songlines.length >= 134) {
                doc.text(songlines.slice(67, 134).join('\n'), 110, 20)
                doc.addPage()
                doc.text(songlines.slice(134).join('\n'), 10, 20)
                // TODO make this modular for like 3+ page songs, rn I'm too lazy
            }
            else {
                doc.text(songlines.slice(67).join('\n'), 110, 20)
            }
        }
        else {
            doc.text(songstr, 20, 20);
        }
        if(i + 1 < contentlist.length) {
            doc.addPage()
        }
    }
    doc.save(filename)
};

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
                fontFace: "Georgia",
                fontSize: 30,
                lineSpacing: 50,
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

/* Splits lyrics string into multiple chunks based on newlines
 *
 * @return list of strings
 */
function splitLyrics(lyrics) {
    lyrics = lyrics.split('\n')
    lyrics.push('') // add empty string so no need for ending statement
    var nlyrics = new Array();
    var currlyric = "";
    var empty = true;
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

document.getElementById("export_button").addEventListener("click", downloadSet);


/*
function downloadPDF() {
    var set_list = document.querySelector('#set_list_items');
    var list_of_songs = set_list.getElementsByTagName("li");
    var songstringlist = []
    for(let i=0; i<list_of_songs.length; i++) {
        songstringlist[i] = list_of_songs[i].getAttribute("data-sheet")
    }
    var today = new Date();
    var date = String(today.getMonth() + 1).padStart(2, '0') + 
        String(today.getDate()).padStart(2, '0') + String(today.getFullYear()).substring(2);
    downloadToPDF(songstringlist, 'set' + date + '.pdf')
}

function downloadText() {
    var intro_string = "PREPARE YOUR SET USING THE FOLLOWING:\n 1. Use a monospaced font to ensure spacing is right (e.g Courier)\n 2. Select all the set and format into two columns\n 3. Add page breaks into between songs\n";

    var set_list = document.querySelector('#set_list_items');
    var list_of_songs = set_list.getElementsByTagName("li");
    var export_string = "";

    for (let i=0; i<list_of_songs.length; i++) {
        export_string = export_string + "\n" + list_of_songs[i].getAttribute("data-sheet");
    }

    export_string = intro_string + export_string;
    today = new Date();
    var date = String(today.getMonth() + 1).padStart(2, '0') + String(today.getDate()).padStart(2, '0') + String(today.getFullYear()).substring(2);
    downloadToTextFile(export_string, 'set' + date + '.txt', 'text/plain');
}


//document.getElementById("export_button").addEventListener("click", downloadText);
//document.getElementById("pdf_button").addEventListener("click", downloadPDF)

*/
