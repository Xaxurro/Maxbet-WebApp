const User = require('../models/user');

module.exports.signup = function (req, res) {
    if (!req.body.user) return res.status(200).send({sucess: false, error: 'user info not found'});

    try {
        User.signup(req.body.user)
            .then(() => {
                res.status(200).send({sucess: true, error: 'user created succesfully'});
            }).catch(error => res.status(200).send({sucess: false, error: error.message}))
    } catch (error) {
        res.status(500).send({sucess: false, error: error.message})
    }
}