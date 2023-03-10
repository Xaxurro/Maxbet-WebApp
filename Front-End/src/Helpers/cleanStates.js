const cleanStates = (states = []) => {
    states.forEach(state => {
        state.set("");
    });
};

export {cleanStates}