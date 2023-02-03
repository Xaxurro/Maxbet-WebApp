const express = require('express');
// router se encarga de manejar las rutas de la API
const router = express.Router();

const productController = require('../controllers/productController');

router.post('/', productController.register);
router.patch('/', productController.update);
router.get('/:serial', productController.getOne);
router.get('/', productController.getAll);
router.delete('/', productController.unRegister);

// Exporta las rutas a app.js
module.exports = router;