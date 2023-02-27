const sendRequest = (url, body = {}, method = 'GET', getFunction) => {
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
    }).then(() => getFunction());
};

export {sendRequest}