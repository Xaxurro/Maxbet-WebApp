const express = require('express');
// router se encarga de manejar las rutas de la API
const router = express.Router();

const workListController = require('../controllers/workListsController');

router.post('/', workListController.register);
router.patch('/', workListController.update);
router.get('/:id', workListController.getOne);
router.get('/', workListController.getAll);
router.delete('/', workListController.unRegister);

// Exporta las rutas a app.js
module.exports = router;