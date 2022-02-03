export default class PubSub {
    constructor() {
        this.events = {};
    }
}

subscribe(event, callback) {
    let self = this;

    if(!self.events.hasOwnProperty(event)) {
        self.events[event] = [];
    }

    return self.events[event].push(callback);
}

publish(event, data={}) {

    let self = this;
    if(!self.events.hasOwnProperty(event)) {
        return [];
    }

    return self.events[event].map(callback => callback(data));
    // For each function in in the list attached to that event, run it with the data
}
