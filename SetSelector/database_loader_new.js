//Runs using Node.js, creates a database out of the txt files in the "Songs" Directory

var directory ="./songs/"
var filename_write = "database_UG.js";
var count_no = 3;
var song_database = [];

const fs = require('fs');


fs.readdir(directory, (err, files) => {
    files.forEach(file => {
      console.log(file);
      if (file.includes("txt")) {
        var song = new Object();

        var splits = file.split("—");
        song.author = splits[0].trim();
        
        var splits2 = splits[1].split(/[(.]/); //match first one, no global flag needed
        song.title = splits2[0].trim();

        var file_text = fs.readFileSync((directory + file),'utf8');
        var index_start = file_text.indexOf("TEMPO"); 

        song.tempo = file_text.slice(index_start + 6, index_start + file_text.slice(index_start).indexOf("\n"));
        song.tempo = song.tempo.trim();
        song.sheet = song.title.toUpperCase() + "\nAUTHOR: " + song.author + "\n" + file_text.slice(index_start);

        song_database.push(song);
        console.log(song);

      }

    });

    //alphabetize
    song_database.sort((a,b) => a.title.localeCompare(b.title));

    fs.writeFileSync(filename_write, "DATABASE = " + JSON.stringify(song_database));

  });




