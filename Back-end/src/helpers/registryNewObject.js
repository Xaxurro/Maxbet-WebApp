// Agrega al historial del producto los datos iniciales
function registryChanges(newObj) {
    for (const key in newObj) {
        if (Object.hasOwnProperty.call(newObj, key) && key != "history" && newObj[key] != undefined) {
            newObj.history.push({change: "CREADO", key: key, value: newObj[key]});
        }
    }
};

module.exports = registryChanges;