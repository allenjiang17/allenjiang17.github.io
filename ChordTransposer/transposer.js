/*
Index code: 
0 = A
1 = A#/Bb   - Bb preferred
2 = B
3 = C
4 = C#/Db  - Db preferred
5 = D
6 = D#/Eb  - Eb preferred
7 = E
8 = F
9 = F#/Gb  - F# preferred
10 = G
11 = G#/Ab  - Ab preferred
*/

//Global Variables
var KEY;

const chord_vals = [["A","A#","B","C","C#","D","D#","E","F","F#","G","G#"],
              ["A","Bb","B","C","Db","D","Eb","E","F","Gb","G","Ab"]];

//true = sharp; false = flat
const key_natures = {0: true,
               1: false,
               2: true,
               3: true,
               4: false,
               5: true,
               6: false,
               7: true,
               8: false,
               9: true,
               10: true,
               11: false};

document.getElementById("text_entry").addEventListener("input", updateKey);
document.getElementById("button_plus").addEventListener("click", function(){transposeText(+1)});
document.getElementById("button_minus").addEventListener("click", function(){transposeText(-1)});


function updateKey() {
    let text = document.getElementById("text_entry").value;
    KEY = determine_key(text);

    //update key on html
    if (key_natures[KEY]) {
        document.getElementById("key_display").innerText = chord_vals[0][KEY];
    
    } else {
        document.getElementById("key_display").innerText = chord_vals[1][KEY];
    }
}

function transposeText(num_steps) {
    let text = document.getElementById("text_entry").value;
    document.getElementById("text_entry").value = transpose(text, num_steps);
    updateKey();

}

function determine_key(raw_text) {
    var text = raw_text.split("\n");

    var total_chords = [];

    for (let i=0; i<text.length; i++) {
        //determine whether the line is lyric or chord
        if (chord_line(text[i])) {
            var chords = "";

            //find the chords in a line
            for (let j=0; j<text[i].length; j++) {
                if ((/[a-zA-Z1-9#\/]/).test(text[i][j])) {
                    chords = chords.concat(text[i][j]);
                } else {

                    if (chords.length != 0) {
                        total_chords.push(chords);
                        chords = "";
                    }
                }
            }
            //add last chord at end of line if it exists
            if (chords.length != 0) {
                total_chords.push(chords);
            }

            
        }
    }
    return infer_key(total_chords);

}
function transpose(raw_text, num_steps) {    

    var text = raw_text.split("\n");
    var new_text = "";

    for (let i=0; i<text.length; i++) {
        //determine whether the line is lyric or chord
        if (chord_line(text[i])) {
            var chord = "";
            var new_line = text[i];

            //find the chords in a line
            for (let j=0; j<text[i].length; j++) {

                if ((/[a-zA-Z1-9#]/).test(text[i][j])) {
                    chord = chord.concat(text[i][j]);
                } else {
                    if (chord.length != 0) {

                        var new_chord = transpose_chord(chord, num_steps); 
                        //to lower case prevents repeat replacing later on
                        new_line = new_line.replace(chord, new_chord.toLowerCase());
                        chord = "";

                    }
                }
            }
            //add last chord at end of line if it exists
            if (chord.length != 0) {
                var new_chord = transpose_chord(chord, num_steps); 
                new_line = new_line.replace(chord, new_chord.toLowerCase());
            }

            //corrections
            new_line = new_line.toUpperCase();
            new_line = new_line.replaceAll("M","m");
            new_line = new_line.replaceAll("AB","Ab");
            new_line = new_line.replaceAll("BB","Bb");
            new_line = new_line.replaceAll("DB","Db");
            new_line = new_line.replaceAll("EB","Eb");
            new_line = new_line.replaceAll("GB","Gb");

            new_text = new_text + new_line + "\n";

        } else {
            new_text = new_text + text[i] + "\n";
        }
    }
    return new_text
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

//sanitizes and determines the integer value mapping of the chord
//returns a tuple (integer value, chord match)
function chord_to_val(chord) {

    var val;
    var chord_match;
    var max_chord_length = 0;

    //iterate through chords and see if any match. chord_vals[0] refers to sharp chords, chord_vals[1] flat chords
    for (let i=0; i<chord_vals[0].length; i++) {
        if (chord.includes(chord_vals[0][i])) {
            if (chord_vals[0][i].length > max_chord_length) {
                max_chord_length = chord_vals[0][i].length;
                chord_match = chord_vals[0][i];
                val = i;
            }      
        }
        if (chord.includes(chord_vals[1][i])) {
            if (chord_vals[1][i].length > max_chord_length) {
                max_chord_length = chord_vals[1][i].length;
                chord_match = chord_vals[1][i];
                val = i;

            }  
        }
    }

    //if no chord match, error
    if (max_chord_length == 0) {
        console.log("An error occurred. Chord could not be matched:", chord);
        return null, chord;
    }
    return [val, chord_match]
}

//determines new value after transposing (wrapping around)
function val_transpose(val, num_steps) {
    var new_val;

    if (num_steps > 0) {
        new_val = ((val + num_steps) % 12);
    } else {
        new_val = (val + num_steps);
        if (new_val < 0) {
            new_val += 12;
        }
    }
    return new_val;
}

/*
function transpose_chord(input_chord, num_steps) {
    if (input_chord.includes("/")) {
        var split_chords = input_chord.split("/");
        return (transpose_chord_piece(split_chords[0], num_steps) + "/" + transpose_chord_piece(split_chords[1], num_steps));

    } else {
        return (transpose_chord_piece(input_chord, num_steps));
    }

}
*/

//transposes chord using input chord and number of steps
function transpose_chord(input_chord, num_steps) {

    var chord_match_array = chord_to_val(input_chord);
    var val = chord_match_array[0];
    var chord_match = chord_match_array[1]; 

    if (val == null) {
        return chord_match;
    }
        
    var new_val = val_transpose(val, num_steps);

    if (key_natures[val_transpose(KEY, num_steps)]) {
        return input_chord.replace(chord_match, chord_vals[0][new_val]);
    } else {
        return input_chord.replace(chord_match, chord_vals[1][new_val]);

    }
}

//utility function, counts to see the most common item in an array
function counter(input_array) {
    var return_array = [];

    for (let i=0; i<input_array.length; i++) {
        //check if input is already in the return array
        if (!(JSON.stringify(return_array).includes(JSON.stringify(input_array[i])))) { 
            
            var count = 0;

            for (let j=0; j<input_array.length; j++) {
                if (JSON.stringify(input_array[i]) == JSON.stringify(input_array[j])) {
                    count++;
                }                
            }
            return_array.push([input_array[i], count]);

        }
    }
    return return_array;
}

function infer_key(chords) {
    var val_list = [];
    var minor;
    var prob;
    //list of tuples containing (integer val of chord, minor/major bool)

    for (let i=0; i<chords.length; i++ ){

        //take first part of chord, bass not does not matter
        var raw_chord = chords[i].split("/")[0];
        var chord_match_array = chord_to_val(raw_chord);
        var val = chord_match_array[0];
        var chord_match = chord_match_array[1];


        if (val == null) {
            continue;
        }

        if (raw_chord.includes("m")) {
            minor = true;
        
        } else {
            minor = false;
        }


        val_list.push([val, minor]);

    }

    var counted_val_list = counter(val_list);
    var final_list = [];

    for (let i=0; i<counted_val_list.length; i++) {
        var val = counted_val_list[i];

        prob = val[1]; //add to probability the frequency of the chord appearence itself

        //if the relative IV, V and vii of each key is present, more likely it is in that key
        var fourth = (val[0][0] + 5) % 12;
        var fifth = (val[0][0] + 7) % 12;
        var sixth = (val[0][0] + 9) % 12;

        for (let j=0; j<counted_val_list.length; j++) {
            //add the frequency of the chord appearance to create a crude "probability"
            var val2 = counted_val_list[j];

            if (val2[0][0] == fourth && !val2[0][1]) {
                prob += val2[1];
            }
            else if (val2[0][0] == fifth && !val2[0][1]) {
                prob += val2[1];
            }
            else if (val2[0][0] == sixth && val2[0][1]) {
                prob += val2[1];
            }
        }
        final_list.push([val[0][0], prob]);

    }

    //sort the list based on probabilities, find highest probability
    var sorted_final_list =  final_list.sort(function(a, b){return b[1] - a[1]}); 

    //If the list is not empty
    if (sorted_final_list.length != 0) {

        return sorted_final_list[0][0];

    } else {
        console.log("Key could not be determined");
        return 0;

    }

}

function increment_key(key, direction) {
    var val = chord_to_val(key)[0];

    if (direction == "UP") {
        new_val = val_transpose(val, 1);
    }
    else {
        new_val = val_transpose(val, -1);
    }

    if (key_natures[new_val]) {
        return chord_vals[0][new_val];
    }
    else {
        return chord_vals[1][new_val];
    }

}

function key_difference(key1, key2) {
    var val1 = chord_to_val(key1)[0];
    var val2 = chord_to_val(key2)[0];

    return val2 - val1
}
