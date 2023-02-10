const express = require('express');
// router se encarga de manejar las rutas de la API
const router = express.Router();

const userController = require('../controllers/userController');

router.post('/', userController.signup);

// Exporta las rutas a app.js
module.exports = router;