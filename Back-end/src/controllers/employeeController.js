const EmployeeModel = require('../models/employee');

const response = require('../db/response');

module.exports.signup = function (req, res) {
    // Devuelve un Error si no encuentra un 'employee' en la request
    if (!req.body.employee) return response.error(req, res, 'employee info not found', 200);

    try {
        EmployeeModel.signup(req.body.employee)
            .then(() => {
                // Envia un response de que se creo el usuario correctamente
                response.success(req, res, 'employee created succesfully');
                // Si no envia una response del porque no se creo el usuario
            }).catch(error => response.error(req, res, error.message, 200))
    } catch (error) {
        // Si no puede ejecutar la funcion envia una response con el error
        response.error(req, res, error.message);
    }
}

module.exports.update = function (req, res) {
    // Devuelve un Error si no encuentra un 'employee' en la request
    console.log(req.body);
    if (!req.body.employee) return response.error(req, res, 'employee info not found', 200);

    try {
        EmployeeModel.update(req.body.id, req.body.employee)
            .then(() => {
                // Envia un response de que se modifico el usuario correctamente
                response.success(req, res, 'employee updated succesfully');
                // Si no envia una response del porque no se creo el usuario
            }).catch(error => response.error(req, res, error.message, 200))
    } catch (error) {
        // Si no puede ejecutar la funcion envia una response con el error
        response.error(req, res, error.message);
    }
}

module.exports.getAll = function (req, res) {
    try {
        EmployeeModel.getAll()
        .then(data => {
            response.getAllData(req, res, data);
        }).catch(error => response.error(req, res, error.message, 200));
    } catch (error) {
        response.error(req, res, error.message);
    }
}

module.exports.deleteAccount = function (req, res) {
    // Devuelve un Error si no encuentra un 'employee' en la request
    if (!req.body.id) return response.error(req, res, 'employee id not found', 200);

    try {
        EmployeeModel.deleteAccount(req.body.id)
            .then(() => {
                // Envia un response de que se creo el usuario correctamente
                response.success(req, res, 'employee deleted succesfully');
                // Si no envia una response del porque no se creo el usuario
            }).catch(error => response.error(req, res, error.message, 200))
    } catch (error) {
        // Si no puede ejecutar la funcion envia una response con el error
        response.error(req, res, error.message);
    }
}