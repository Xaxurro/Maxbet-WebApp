const Product = require('../models/product');

const response = require('../db/response');

module.exports.register = function (req, res) {
    if (!req.body.product) return response.error(req, res, 'product info not found', 200);

    try {
        Product.register(req.body.product)
            .then(() => {
                response.success(req, res, 'product created succesfully');
            }).catch(error => response.error(req, res, error.message, 200));
    } catch (error) {
        response.error(req, res, error.message);
    }
}

module.exports.getAll = function (req, res) {
    
    try {
        Product.getAll()
        .then(data => {
            response.getAllData(req, res, data);
        }).catch(error => response.error(req, res, error.message, 200));
        console.log(res.body);
    } catch (error) {
        response.error(req, res, error.message);
    }
}