const getModelByName = require('../db/getModelByName');

module.exports.register = function (req, res) {
    if (!req.body.product) return res.status(200).send({sucess: false, error: 'product info not found'});

    const Product = getModelByName('product');

    try {
        Product.register(req.body.product)
            .then(() => {
                res.status(200).send({sucess: true, error: 'product created succesfully'});
            }).catch(error => res.status(200).send({sucess: false, error: error.message}))
    } catch (error) {
        res.status(500).send({sucess: false, error: error.message})
    }
}