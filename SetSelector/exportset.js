
var intro_string = "PREPARE YOUR SET USING THE FOLLOWING:\n 1. Use a monospaced font to ensure spacing is right (e.g Courier)\n 2. Select all the set and format into two columns\n 3. Add page breaks into between songs\n";

//from https://robkendal.co.uk/blog/2020-04-17-saving-text-to-client-side-file-using-vanilla-js
const downloadToTextFile = (content, filename, contentType) => {
    const a = document.createElement('a');
    const file = new Blob([content], {type: contentType});
    
    a.href= URL.createObjectURL(file);
    a.download = filename;
    a.click();
  
      URL.revokeObjectURL(a.href);
};

function downloadSet() {
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


document.getElementById("export_button").addEventListener("click", downloadSet);
