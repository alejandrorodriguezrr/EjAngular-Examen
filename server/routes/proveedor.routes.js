const express = require('express');
const router = express.Router();

const lblcontrol = require('../controllers/proveedores.controlador.js');

router.get('/', lblcontrol.mostrarProveedores);

router.post('/',lblcontrol.crearProveedor);

router.get('/:nombre', lblcontrol.mostrarProveedor);

router.delete('/:nombre', lblcontrol.borrarProveedor);

module.exports = router;