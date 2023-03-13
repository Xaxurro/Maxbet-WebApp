const sendRequest = (url, body = {}, method = 'GET', setState, getFunction) => {
    if (method === 'GET') return fetch(url, {method: method}) 
    if (!getFunction) return fetch(url, {
        method: method,
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(body)
    });
    return fetch(url, {
        method: method,
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(body)
    })
    .then(response => response.json())
    .then(json => {setState(json.message); console.log(json);})
    .then(() => getFunction());
};

export {sendRequest}