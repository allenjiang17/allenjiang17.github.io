const exporthtml = `
  <p id="export_label" class = "section_label"> Export Set</p>
  <select name="export_select" id="export_select" style="display:inline-block">
      <option value="docx">Word Doc</option>
      <option value="pdf">PDF</option>
      <option value="ppt">Powerpoint (Media Slides)</option>
      <option value="text">Plain Text</option>
  </select>
  <button style="display:inline-block" id="export_button">Download</button>
`


// Initialization

document.getElementById("export").innerHTML = exporthtml;
document.getElementById("export_button").addEventListener("click", downloadSet);




// Functions


function downloadSet() {
    var set_list = document.querySelector('#set_list_items');
    var list_of_songs = set_list.getElementsByTagName("li");
    var today = new Date();
    var date = String(today.getMonth() + 1).padStart(2, '0') + String(today.getDate()).padStart(2, '0') + String(today.getFullYear()).substring(2);
    var write_name = 'set' + date;
    const dtype = document.getElementById("export_select").value;

    if (dtype == "pdf") {
        let songstringlist = [];
        for(let i=0; i<list_of_songs.length; i++) {
            songstringlist[i] = list_of_songs[i].getAttribute("data-sheet")
        }
        downloadToPDF(songstringlist, write_name + '.pdf')
    } else if (dtype == "ppt") {
        let export_songs = []
        for (let i=0; i<list_of_songs.length; i++) {
            export_songs[i] = list_of_songs[i].getAttribute("data-lyrics");
        }
        downloadToPPT(export_songs, write_name +'.pptx');
    } else if (dtype == "text") {
        var intro_string = "PREPARE YOUR SET USING THE FOLLOWING:\n 1. Use a " + 
        "monospaced font to ensure spacing is right (e.g Courier)\n 2. Select " + 
        "all the set and format into two columns\n 3. Add page breaks into " + 
        "between songs\n";
        var export_string = "";

        for (let i=0; i<list_of_songs.length; i++) {
          export_string = export_string + "\n" + list_of_songs[i]
              .getAttribute("data-sheet");
        }
        export_string = intro_string + export_string;
        downloadToTextFile(export_string, write_name + '.txt', 'text/plain');
    } else if (dtype == "docx") {
        let songstringlist = [];
        for(let i=0; i<list_of_songs.length; i++) {
            songstringlist[i] = list_of_songs[i].getAttribute("data-sheet")
        }
        downloadDocx(songstringlist, write_name + '.docx')
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

/**
 * Formats and prints lines to a pdf page
 * returns remaining unprinted lines
 */
function printPage(songlines, doc) {
  let tmp = songlines;
  while(tmp[0].trim() == "") { tmp.shift(); }
  doc.text(tmp.slice(0, 68).join('\n'), 15, 15)
  if(tmp.length > 69) {
    tmp = tmp.slice(0, 136);
    if(tmp.every(line => line.length < 45)) { 
      // All lines fit in one column
      doc.text(tmp.slice(68, 136).join('\n'), 110, 15)
      if(tmp.length > 136) {
        tmp = tmp.slice(136);
        while(tmp[0].trim() == "") { tmp.shift(); }
        if(tmp.length > 0) { 
          doc.addPage()
          return tmp;
        }
      }
    } else {
      tmp = tmp.slice(68);
      while(tmp[0].trim() == "") { tmp.shift(); }
      if(tmp.length > 0) { 
        doc.addPage()
        return tmp;
      }
    }
  }
  return [];
}

const downloadToPDF = (contentlist, filename) => {
    var doc = new jspdf.jsPDF();
    doc.setFont("SourceCodePro-Regular", "normal");
    doc.setFontSize(10);
    for (let i=0; i<contentlist.length; i++) { // Iterate through set list
        let songlines = contentlist[i].split("\n");
        while(songlines.length > 0) {
            songlines = printPage(songlines, doc);
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

function downloadDocx(content, filename) {
  let paragraphlist = [];
  content.forEach((song, index) => {
    song = song.split('\n');
    if(index > 0) {
      paragraphlist.push(new docx.Paragraph({children: [new docx.PageBreak()], }))
    }
    for(const line of song) {
      paragraphlist.push(new docx.Paragraph({children: [ 
        new docx.TextRun({text: line, font: "Lucida Sans Typewriter"}), 
      ],}))
    }
  });
  const doc = new docx.Document({
    sections: [{
          properties: {column: new docx.Columns({count: 2})},
          children: paragraphlist,
          }]
  });
  
  docx.Packer.toBlob(doc).then((blob) => {
    console.log(blob);
    const a = document.createElement('a');
    a.href= URL.createObjectURL(blob);
    a.download = filename;
    a.click();
    URL.revokeObjectURL(a.href);
    console.log("Document created successfully");
  });
}
