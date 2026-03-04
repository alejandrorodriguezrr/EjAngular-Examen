const express = require('express');
const router = express.Router();
const upload = require('../multer.config');

const lblcontrol = require('../controllers/proveedor.controlador.js');

router.get('/', lblcontrol.mostrarClientes);

router.post('/', upload.single('imagen'), lblcontrol.crearCliente);

router.get('/:id', lblcontrol.mostrarCliente);

router.delete('/:id', lblcontrol.borrarCliente);

module.exports = router;