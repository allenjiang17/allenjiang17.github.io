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
    doc.setFont("RobotoMono-Medium", "normal");
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

    //for every song
    for (let i=0; i<content.length; i++) {
        let text = content[i];
        let stanza = "";

        //for every stanza. stanzas follow the format [Verse/Chorus/Bridge], marked by an end bracket

        for (let j=0; j<text.length;j++) {

            if (text[j] == "]") {
                //new stanza
                stanza = "";
                
            } else if (text[j] == "[") {
                //add stanza to slide
                var slide = pres.addSlide();
                slide.background = { color: "111111" }; 
                slide.addText(stanza, {align: "center", color: "FFFFFF", valign: "middle"});

            } else {
                stanza = stanza + text[j];
            }

        }
        //add last stanza
        var slide = pres.addSlide();
        slide.background = { color: "111111" }; 
        slide.addText(stanza, {align: "center", color: "FFFFFF", valign: "middle"});
    }

    pres.writeFile({ fileName: filename });
};

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
