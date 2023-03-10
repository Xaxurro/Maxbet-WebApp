const filter = (filter, states, get) => {
    states.forEach(state => {
        filter[state.name] = state.value;
    });
    get();
}

export { filter };