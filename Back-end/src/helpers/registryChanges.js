// Agrega al historial del producto los cambios realizados
function registryChanges(oldObj, newObj) {
    for (const key in newObj) {
        if (Object.hasOwnProperty.call(newObj, key) && key != "history" && newObj[key] != undefined && oldObj[key] != newObj[key]) {
            newObj.history.push({change: "MODIFICADO", comment: `${key}: ${newObj[key]}`});
        }
    }
};

module.exports = registryChanges;