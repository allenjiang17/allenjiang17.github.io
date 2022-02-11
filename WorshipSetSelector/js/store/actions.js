export default {
    selectSong(context, payload) {
        context.commit('selectSong', payload);
    },
    previewSong(context, payload) {
        if(payload !== context.state.previewsong) {
            context.commit('setPreviewLyric', null);
        }
        context.commit('previewSong', payload);
    },
    clearItem(context, payload) {
        context.commit('clearItem', payload);
    },
    present(context, payload) {
        context.commit('present', payload);
    },
    stoppresent(context) {
        context.commit('stoppresent', null);
    },
    setPreviewLyric(context, payload) {
        context.commit('setPreviewLyric', payload);
    }
}

// Here, each context is a specific instance of store.
//
// The typical lifecycle is that a user input will run the store.dispatch
// function with one of these keys (the function names or keys in this dict)
// which will call a mutation (or multiple mutations) to the state. Typically
// you should store the logic that is attached to ur UI/UX here, and the
// mutations effectively amount to setters/deleters.
