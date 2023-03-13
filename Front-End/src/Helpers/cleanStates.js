const cleanStates = (states = []) => {
    states.forEach(state => {
        state.set(state.default);
    });
};

export {cleanStates}