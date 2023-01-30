const express = require('express');
const productController = require('../controllers/productController');

const router = express.Router();

router.post('/register', productController.register);

module.exports = router;