function getTempo(lyrics) {
    lyrics = lyrics.split('\n');
    for (let i=0; i < lyrics.length; i++) {
        let re = new RegExp('^verse.*:', 'i');
        let l = lyrics[i].trim();
        if(re.test(l)) {
            l = l.replace(re, "");
            l = l.split(',');
            return l.map(e => {return e.trim();});
        }
    }
}
    
/* Splits lyrics string into multiple chunks based on newlines
 *
 * @return list of strings
 */
function splitLyrics(lyrics) {
    lyrics = lyrics.split('\n')
    lyrics.push('') // add empty string so no need for ending statement
    var nlyrics = new Array();
    var currlyric = "";
    var empty = true;
    for (let i=0; i < lyrics.length; i++) {
        var l = lyrics[i].trim()
        var regex = [
            '^\\[.*\\]$',
            '^TEMPO:',
            '^NOTE',
            '^Verse.*:',
            '^Chorus.*:',
            '^Bridge.*:'
        ]
        var re = new RegExp(regex.join('|'), 'i')
        if(re.test(l)) { l = "" }
        if(l) {
            l = l.replace(/AUTHOR:/i, '')
            if(empty) {
                currlyric = l
            } else {
                currlyric = currlyric + '\n' + l
            }
            empty = false
        } else if(!empty){
            nlyrics.push(currlyric)
            currlyric = "";
            empty = true
        }
    }
    return nlyrics;
}

function datasheet2lyrics(ds) {
}
