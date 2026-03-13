const express = require('express');
const router = express.Router();

const comprasControl = require('../controllers/proveedor.controlador.js');

router.post('/', comprasControl.crearProveedor);

router.get('/', comprasControl.mostrarProveedores);

router.get('/:id', comprasControl.mostrarProveedor);

router.delete('/:id', comprasControl.borrarProveedor);

module.exports = router;