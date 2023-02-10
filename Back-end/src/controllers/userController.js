const UserModel = require('../models/user');

const response = require('../db/response');

module.exports.signup = function (req, res) {
    // Devuelve un Error si no encuentra un 'user' en la request
    if (!req.body.user) return response.error(req, res, 'product info not found', 200);

    try {
        UserModel.signup(req.body.user)
            .then(() => {
                // Envia un response de que se creo el usuario correctamente
                response.success(req, res, 'user created succesfully');
                // Si no envia una response del porque no se creo el usuario
            }).catch(error => response.error(req, res, error.message, 200))
    } catch (error) {
        // Si no puede ejecutar la funcion envia una response con el error
        response.error(req, res, error.message);
    }
}