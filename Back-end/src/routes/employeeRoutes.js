const express = require('express');
// router se encarga de manejar las rutas de la API
const router = express.Router();

const employeeController = require('../controllers/employeeController');

router.post('/', employeeController.register);
router.patch('/', employeeController.update);
router.get('/:serial', employeeController.getOne);
router.get('/', employeeController.getAll);
router.delete('/', employeeController.unRegister);

// Exporta las rutas a app.js
module.exports = router;