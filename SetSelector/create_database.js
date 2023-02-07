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
        
        var splits2 = splits[1].split(/[(.]/); 
          //match first one, no global flag needed
        song.title = splits2[0].trim();

        var file_text = fs.readFileSync((directory + file),'utf8');
        var index_start = file_text.indexOf("TEMPO"); 

        song.tempo = file_text.slice(index_start + 6, index_start + 
          file_text.slice(index_start).indexOf("\n"));
        song.tempo = song.tempo.trim();
        song.sheet = song.title.toUpperCase() + "\nAUTHOR: " + song.author + 
          "\n" + file_text.slice(index_start);

        song.lyrics = remove_chord_lines(song.sheet);

        song_database.push(song);
        console.log(song);

      }

    });

    //alphabetize
    song_database.sort((a,b) => a.title.localeCompare(b.title));

    fs.writeFileSync(filename_write, "DATABASE = " + 
      JSON.stringify(song_database));

});


function remove_chord_lines(raw_text) {
  var text = raw_text.split("\n");
  var newtext = ""

  for (let i=0; i<text.length; i++) {
      if (!chord_line(text[i])) {
          newtext = newtext + text[i] + "\n";
      }
  }
  return newtext;
}

//determines whether a line of text is a chord line or not
//return true or false
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




