import actions from './actions.js';
import mutations from './mutations.js';
import state from './state.js';
import Store from './store.js';

export default new Store({
    actions,
    mutations,
    state
});

// Index is effectively just a store that has been initialized with specific
// actions, mutations, and default state.
