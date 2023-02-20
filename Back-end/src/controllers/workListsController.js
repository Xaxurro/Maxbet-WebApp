const WorkListModel = require('../models/worklist');

const response = require('../db/response');

module.exports.register = function (req, res) {
    // Devuelve un Error si no encuentra un 'product' en la request
    if (!req.body.list) return response.error(req, res, 'list info not found', 200);

    try {
        WorkListModel.register(req.body.list)
            .then(() => {
                // Envia un response de que se creo el producto correctamente
                response.success(req, res, 'list created succesfully');
                // Si no envia una response del porque no se creo el producto
            }).catch(error => response.error(req, res, error.message, 200));
    } catch (error) {
        // Si no puede ejecutar la funcion envia una response con el error
        response.error(req, res, error.message);
    }
}

module.exports.update = function (req, res) {
    // Devuelve un Error si no encuentra un 'product' en la request
    if (!req.body.id) return response.error(req, res, 'list id not found', 200);
    if (!req.body.list) return response.error(req, res, 'list info not found', 200);

    try {
        WorkListModel.update(req.body.id, req.body.list)
            .then(() => {
                // Envia un response de que se creo el producto correctamente
                response.success(req, res, 'list updated succesfully');
                // Si no envia una response del porque no se creo el producto
            }).catch(error => response.error(req, res, error.message, 200));
    } catch (error) {
        // Si no puede ejecutar la funcion envia una response con el error
        response.error(req, res, error.message);
    }
}

module.exports.getOne = function (req, res) {
    try {
        WorkListModel.getOne(req.params.id, WorkListModel)
        .then(data => {
            response.getAllData(req, res, data);
        }).catch(error => response.error(req, res, error.message, 200));
    } catch (error) {
        response.error(req, res, error.message);
    }
}

module.exports.getAll = function (req, res) {
    try {
        WorkListModel.getAll()
        .then(data => {
            response.getAllData(req, res, data);
        }).catch(error => response.error(req, res, error.message, 200));
    } catch (error) {
        response.error(req, res, error.message);
    }
}

module.exports.unRegister = function (req, res) {
    // Devuelve un Error si no encuentra un 'product' en la request
    if (!req.body.id) return response.error(req, res, 'id not found', 200);
    try {
        WorkListModel.unRegister(req.body.id)
        .then(() => {
            response.success(req, res, "Lista eliminado correctamente.");
        }).catch(error => response.error(req, res, error.message, 200));
    } catch (error) {
        response.error(req, res, error.message);
    }
}