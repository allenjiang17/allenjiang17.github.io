const downloadToPPT = (content, filename) => {
    var pres = new PptxGenJS();
    for (let i=0; i<content.length; i++) {
        var slide = pres.addSlide();
        slide.background = { color: "111111" }; 
        slide.addText("hello world", {align: "center", color: "FFFFFF", y: 0.25});
    }
    pres.writeFile({ fileName: filename });
};


function downloadPPT() {
    var set_list = document.querySelector('#set_list_items');
    var list_of_songs = set_list.getElementsByTagName("li");
    var export_songs = []


    for (let i=0; i<list_of_songs.length; i++) {
        export_songs[i] = list_of_songs[i].getAttribute("data-lyrics");
    }

    var today = new Date();
    var date = String(today.getMonth() + 1).padStart(2, '0') + 
        String(today.getDate()).padStart(2, '0') + String(today.getFullYear()).substring(2);
    downloadToPPT(export_songs, 'set' + date + '.pptx');
}

document.getElementById("ppt_button").addEventListener("click", downloadPPT)



