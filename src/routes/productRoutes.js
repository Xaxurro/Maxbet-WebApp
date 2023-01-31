const express = require('express');
const router = express.Router();

const productController = require('../controllers/productController');

router.post('/register', productController.register);
router.get('/products', productController.getAll);

module.exports = router;