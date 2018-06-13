import {err, info} from "./logging";

const initialStore = {};

const wiring = new Map();

function registerReducer(type, fn) {
    info('Registered reducer ' + type);
    wiring.set(type, fn)
}

function mainReducer(state, action) {
    if (typeof state === "undefined") return initialStore;

    if (wiring.has(!action.type)) {
        err("Couldn't find action from type " + action.type);
        throw "Couldn't find action from type " + action.type;
    } else {
        const reducer = wiring.get(action.type);
        const newState = reducer(state, action);
        if (newState == undefined) throw "State returned by reducer " + action.type + "is null. Use previous state.";
        return newState;
    }
}

// ------------------------- REDUCER ---------------------------
registerReducer("test", function (state, action) {
    info("Hello World!");
    return state;
});

export {mainReducer};