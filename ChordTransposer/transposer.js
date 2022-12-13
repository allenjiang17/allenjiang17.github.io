
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

const chord_vals = [["A","A#","B","C","C#","D","D#","E","F","F#","G","G#"],
              ["A","Bb","B","C","Db","D","Eb","E","F","Gb","G","Ab"]];

//True = sharp; false = flat

const key_natures = {0: True,
               1: False,
               2: True,
               3: True,
               4: False,
               5: True,
               6: False,
               7: True,
               8: False,
               9: True,
               10: True,
               11: False};


//determines whether a line of text is a chord line or not
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

    for (let i=0; i<line.len; i++) {
    
        //spaces
        if (line[i].isspace()) {
            space_count += 1;
        } else {
            letter_count += 1;
        }

        //upper case
        if (line[i].isupper()) {
            upper_count += 1;
        } else if (line[i].islower()) {
            lower_count += 1;
        }

        //excluded characters
        if (excluded_characters.includes(line[i].lower())){
            excluded_count += 1;
        } else if (chord_characters.includes(line[i].lower())) {
            chord_count += 1;
         }

    }

    //heuristic formula for determining likelihood of chord line
    var score = (upper_count - lower_count) + (space_count - letter_count) - 4 * excluded_count + chord_count;

    if (score >= -2) {
        return True;
    } else {
        return False
    }

}

/*
#sanitizes and determines the integer value mapping of the chord
def chord_to_val(chord):
    chord_matches = []

    # iterate through chords and see if any match
    for val, chord_match in enumerate(chord_vals[0]):
        if chord_match in chord:
            #chord_matches.append((val, chord_match, len(chord_match.decode("utf-8")))) for python 2
            chord_matches.append((val, chord_match, len(chord_match)))

    for val, chord_match in enumerate(chord_vals[1]):
        if chord_match in chord:
            chord_matches.append((val, chord_match, len(chord_match)))

    #if no chord match, raise problem
    if not chord_matches:
        print("Chord could not be matched:", chord)
        return None, chord
    # find best chord match (longest one)
    val = max(chord_matches, key=lambda i: i[2])[0]
    chord_match = max(chord_matches, key=lambda i: i[2])[1]

    return val, chord_match

#determines new value after transposing (wrapping around)
def val_transpose(val, num_steps):

    if num_steps > 0:
        new_val = ((val + num_steps) % 12)
    else:
        new_val = (val + num_steps)
        if new_val < 0:
            new_val += 12

    return new_val

#transposes chord using input chord and number of steps
def transpose_chord(input_chord, num_steps, sharp):

    print("Chord: ", input_chord)

    new_chord = input_chord
    chords = input_chord.split("/")

    for chord in chords:

        val, chord_match = chord_to_val(chord)
        if val is None:
            return chord_match

        new_val = val_transpose(val, num_steps)

        if sharp:
            #lowercase version of the chord, as a mark to indicate it has been replaced, preventing duplicate replacement
            new_chord = new_chord.replace(chord_match, chord_vals[0][new_val].lower())

        else:
            new_chord = new_chord.replace(chord_match, chord_vals[1][new_val].lower())


    print("Transposed Chord: ", new_chord)
    return new_chord

def infer_key(chords):
    val_list = []
    #list of tuples containing (integer val of chord, minor/major bool)

    for chord in chords:

        chord = chord.split("/")[0]
        val, chord_match = chord_to_val(chord)

        if val is None:
            continue

        if "m" in chord_match:
            minor = True
        else:
            minor = False

        val_list.append((val, minor))

    print(val_list)
    #make a list of the frequency of each chord appearing
    counted_val_list = Counter(val_list).most_common()
    final_list = []

    for val in counted_val_list:
        prob = val[1] #add to probability the frequency of the chord appearence itself

        #if the relative IV, V and vii of each key is present, more likely it is in that key
        fourth = (val[0][0] + 5) % 12
        fifth = (val[0][0] + 7) % 12
        sixth = (val[0][0] + 9) % 12

        for val2 in counted_val_list:

            #add the frequency of the chord appearance to create a crude "probability"
            if val2[0][0] == fourth and not val2[0][1]:
                prob += val2[1]
            elif val2[0][0] == fifth and not val2[0][1]:
                prob += val2[1]
            elif val2[0][0] == sixth and val2[0][1]:
                prob += val2[1]

        final_list.append((val[0][0], prob))

    #sort the list based on probabilities, find highest probability
    sorted_final_list = sorted(final_list, key = lambda x : x[1], reverse=True)

    print(sorted_final_list)

    #If the list is not empty
    if sorted_final_list:

        #return highest probability chord as the key
        if key_nature(sorted_final_list[0][0]):
            return chord_vals[0][sorted_final_list[0][0]]
        else:
            return chord_vals[1][sorted_final_list[0][0]]

    else:
        return ""

def key_nature(val):

    if type(val) != int:
        val, _ = chord_to_val(val)

    return key_natures.get(val, True) #default set to sharp

def increment_key(key, direction):
    val, _ = chord_to_val(key)

    if direction == "UP":
        new_val = val_transpose(val, 1)
    else:
        new_val = val_transpose(val, -1)

    if key_nature(new_val):
        return chord_vals[0][new_val]
    else:
        return chord_vals[1][new_val]

def key_difference(key1, key2):
    val1, _ = chord_to_val(key1)
    val2, _ = chord_to_val(key2)

    return val2 - val1
*/