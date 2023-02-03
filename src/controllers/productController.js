const ProductModel = require('../models/product');

const response = require('../db/response');

module.exports.register = function (req, res) {
    // Devuelve un Error si no encuentra un 'product' en la request
    if (!req.body.product) return response.error(req, res, 'product info not found', 200);

    try {
        ProductModel.register(req.body.product, ProductModel)
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
    // if (!req.body.product) return response.error(req, res, 'product info not found', 200);

    // try {
    //     ProductModel.register(req.body.product, ProductModel)
    //         .then(() => {
    //             // Envia un response de que se creo el producto correctamente
    //             response.success(req, res, 'product created succesfully');
    //             // Si no envia una response del porque no se creo el producto
    //         }).catch(error => response.error(req, res, error.message, 200));
    // } catch (error) {
    //     // Si no puede ejecutar la funcion envia una response con el error
    //     response.error(req, res, error.message);
    // }
    console.log("UPDATE PRODUCT");
}

module.exports.getOne = function (req, res) {
    try {
        console.log(req.params.serial);
        ProductModel.getOne(req.params.serial)
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
        ProductModel.unRegister(req.body.serial, ProductModel)
        .then(() => {
            response.success(req, res, "Producto eliminado correctamente.");
        }).catch(error => response.error(req, res, error.message, 200));
    } catch (error) {
        response.error(req, res, error.message);
    }
}