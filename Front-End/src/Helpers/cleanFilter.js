import { cleanStates } from "./cleanStates";

const cleanFilter = (filter, states, get, blacklist=[]) => {
    for (const key in filter) {
        if (!blacklist.includes(key)) delete filter[key];
    }
    cleanStates(states);
    get();
}

export { cleanFilter };