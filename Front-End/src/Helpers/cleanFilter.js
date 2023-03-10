import { cleanStates } from "./cleanStates";

const cleanFilter = (filter, states, get) => {
    for (const key in filter) {
        delete filter[key];
    }
    cleanStates(states);
    get();
}

export { cleanFilter };