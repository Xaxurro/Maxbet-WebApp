const User = require('../models/user');

module.exports.signup = function (req, res) {
    // Devuelve un Error si no encuentra un 'user' en la request
    if (!req.body.user) return res.status(200).send({sucess: false, error: 'user info not found'});

    try {
        User.signup(req.body.user)
            .then(() => {
                // Envia un response de que se creo el usuario correctamente
                res.status(200).send({sucess: true, error: 'user created succesfully'});
                // Si no envia una response del porque no se creo el usuario
            }).catch(error => res.status(200).send({sucess: false, error: error.message}))
    } catch (error) {
        // Si no puede ejecutar la funcion envia una response con el error
        res.status(500).send({sucess: false, error: error.message})
    }
}