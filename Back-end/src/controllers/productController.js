const ProductModel = require('../models/product');

const response = require('../db/response');

module.exports.register = function (req, res) {
    // Devuelve un Error si no encuentra un 'product' en la request
    if (!req.body.product) return response.error(req, res, 'product info not found', 200);

    try {
        ProductModel.register(req.body.product)
            .then(() => {
                // Envia un response de que se creo el producto correctamente
                response.success(req, res, 'product created succesfully');
                // Si no envia una response del porque no se creo el producto
            }).catch(error => response.error(req, res, error.message, 200));
    } catch (error) {
        // Si no puede ejecutar la funcion envia una response con el error
        response.error(req, res, error.message);
    }
}

module.exports.update = function (req, res) {
    // Devuelve un Error si no encuentra un 'product' en la request
    if (!req.body.serial) return response.error(req, res, 'product serial not found', 200);
    if (!req.body.product) return response.error(req, res, 'product info not found', 200);

    try {
        ProductModel.update(req.body.serial, req.body.product)
            .then(() => {
                // Envia un response de que se creo el producto correctamente
                response.success(req, res, 'product updated succesfully');
                // Si no envia una response del porque no se creo el producto
            }).catch(error => response.error(req, res, error.message, 200));
    } catch (error) {
        // Si no puede ejecutar la funcion envia una response con el error
        response.error(req, res, error.message);
    }
}

module.exports.getOne = function (req, res) {
    try {
        ProductModel.getOne(req.params.serial, ProductModel)
        .then(data => {
            response.getAllData(req, res, data);
        }).catch(error => response.error(req, res, error.message, 200));
    } catch (error) {
        response.error(req, res, error.message);
    }
}

module.exports.getAll = function (req, res) {
    try {
        ProductModel.getAll()
        .then(data => {
            response.getAllData(req, res, data);
        }).catch(error => response.error(req, res, error.message, 200));
    } catch (error) {
        response.error(req, res, error.message);
    }
}

module.exports.unRegister = function (req, res) {
    // Devuelve un Error si no encuentra un 'product' en la request
    if (!req.body.serial) return response.error(req, res, 'serial not found', 200);
    try {
        ProductModel.unRegister(req.body.serial)
        .then(() => {
            response.success(req, res, "Producto eliminado correctamente.");
        }).catch(error => response.error(req, res, error.message, 200));
    } catch (error) {
        response.error(req, res, error.message);
    }
}