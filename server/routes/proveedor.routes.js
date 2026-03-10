const express = require('express');
const router = express.Router();

const clientesControl = require('../controllers/proveedor.controlador.js');

router.post('/', clientesControl.crearCliente);

router.get('/', clientesControl.mostrarClientes);

router.get('/:id', clientesControl.mostrarCliente);

router.delete('/:id', clientesControl.borrarCliente);

module.exports = router;