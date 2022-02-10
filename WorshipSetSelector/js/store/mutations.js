export default {
    selectSong(state, payload) {
        let newstate = {} //create a newstate and assign the new value
        newstate.currsong = payload;
        return newstate;
    },
    present(state, payload) {
        let newstate = {}
        newstate.presentwindow = payload;
        return newstate;
    }
};

// This file is a list of functions which specifically are allowed to change
// the state.
//
// The functions defined here should always declare and then return a new
// state.
