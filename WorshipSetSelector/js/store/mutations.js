export default {
    addItem(state, payload) {
        state.items.push(payload);
        return state;
    },
    clearItem(state, payload) {
        state.items.splice(payload.index, 1);
        return state;
    }
};

// This file is a list of functions which specifically are allowed to act
// directly upon the state object.
//
// The functions defined here should always return the new state.
