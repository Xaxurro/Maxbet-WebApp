import { cleanStates } from "./cleanStates";

const cleanFilter = (filter, setStates, get) => {
    for (const key in filter) {
        delete filter[key];
    }
    cleanStates(setStates);
    get();
}

export { cleanFilter };