const express = require('express');
const router = express.Router();

const proveedorControl = require('../controllers/proveedor.controlador.js');

router.post('/', proveedorControl.crearProveedor);

router.get('/', proveedorControl.mostrarProveedores);

router.get('/:id', proveedorControl.mostrarProveedor);

router.delete('/:id', proveedorControl.borrarProveedor);

module.exports = router;