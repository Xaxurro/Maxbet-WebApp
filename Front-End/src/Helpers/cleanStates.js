const cleanStates = (states = []) => {
    states.forEach(setState => {
        setState("");
    });
};

export {cleanStates}