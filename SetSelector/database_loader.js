//For offline use, to update the database with songs from a Word doc. 
//Runs using node.js
var filename_read= "songbook.txt";
var filename_write = "database.js";
var count_no = 3;
var song_database = [];

const fs = require('fs');
file_text = fs.readFileSync(filename_read,'utf8');
var text = file_text.split(/[\r\n]/);
    
var first_song = true;

//for each line
for (let i=0; i<text.length; i++) {

    var line = text[i];
    var max_upper_count = 0;
    var upper_count = 0;

    //go thru line and count for the longest stretch of upper case letters
    for (let j=0; j<line.length;j++) {
        if (line[j].match(/[A-Z]/)) {
            upper_count++;
        } else {
            if (upper_count > max_upper_count) {
                max_upper_count = upper_count;
            }
            upper_count = 0;
        }
    }

    //if the whole word was upper case
    if (upper_count > max_upper_count) {
        max_upper_count = upper_count;
    }
    
    //if there are enough upper case letters, consider it a title
    if (max_upper_count >= count_no) {
        //append old song object to array
        if (!first_song) {
            song_database.push(song);
        }
            
        //create new song object with current line as title
        song = new Object();
        song.title = line;
        song.sheet = line; //reset songsheet
            
        first_song = false;
    } else {
        //append to current sheet
        if (!first_song) {
            song.sheet = song.sheet + "\n" + line;
        }
    }

}

song_database.push(song);


            
fs.writeFileSync(filename_write, "DATABASE = " + JSON.stringify(song_database));

