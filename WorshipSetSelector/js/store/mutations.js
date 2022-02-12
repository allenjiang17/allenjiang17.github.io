export default {
    selectSong(state, payload) {
        let newstate = {}; //create a newstate and assign the new value
        newstate.currsong = payload;
        return newstate;
    },
    previewSong(state, payload) {
        let newstate = {}; //create a newstate and assign the new value
        newstate.previewsong = payload;
        return newstate;
    },
    present(state, payload) {
        let newstate = {};
        newstate.presentwindow = payload;
        return newstate;
    },
    stoppresent(state) {
        let newstate = {};
        newstate.presentwindow = null;
        return newstate;
    },
    setPreviewLyricIndex(state, payload) {
        let newstate = {};
        newstate.prevlyricIndex = payload;
        return newstate;
    },
    setCurrLyricIndex(state, payload) {
        let newstate = {};
        newstate.currlyricIndex = payload;
        return newstate;
    },
    setPreviewLyric(state, payload) {
        let newstate = {};
        newstate.prevlyric = payload;
        return newstate;
    },
    setCurrLyric(state, payload) {
        let newstate = {};
        newstate.currlyric = payload;
        return newstate;
    }
};

// This file is a list of functions which specifically are allowed to change
// the state.
//
// The functions defined here should always declare and then return a new
// state.
