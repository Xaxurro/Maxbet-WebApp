const sendRequest = (url, body = {}, method = 'GET') => {
    if (method === 'GET') return fetch(url, {method: method}) 
    return fetch(url, {
        method: method,
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(body)
    });
};

export {sendRequest}