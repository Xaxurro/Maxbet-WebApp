const express = require('express');
// router se encarga de manejar las rutas de la API
const router = express.Router();

const productController = require('../controllers/productController');

router.post('/register', productController.register);
router.get('/products', productController.getAll);
router.delete('/unregister', productController.unRegister);

// Exporta las rutas a app.js
module.exports = router;