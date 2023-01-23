const downloadToPPT = (content, filename) => {
    var pres = new pptxgen.pptxgen();
    var slide = pres.addSlide();
};


function downloadPPT() {
    var set_list = document.querySelector('#set_list_items');
    var list_of_songs = set_list.getElementsByTagName("li");
    var export_songs = []


    for (let i=0; i<list_of_songs.length; i++) {
        export_songs[i] = list_of_songs[i].getAttribute("data-lyrics");
    }

//    today = new Date();
//    var date = String(today.getMonth() + 1).padStart(2, '0') + 
//        String(today.getDate()).padStart(2, '0') + String(today.getFullYear()).substring(2);
//    downloadToPPT(export_songs, 'set' + date + '.pptx');
}

document.getElementById("ppt_button").addEventListener("click", downloadPPT)



