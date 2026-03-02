const express = require('express');
const router = express.Router();

const comprasControl = require('../controllers/compras.controlador.js');

router.post('/', comprasControl.crearCompra);

router.get('/', comprasControl.mostrarCompras);

router.get('/:id', comprasControl.mostrarCompra);

router.get('/cliente/:clienteId', comprasControl.mostrarComprasCliente);

router.delete('/:id', comprasControl.borrarCompra);

router.delete('/:id', comprasControl.borrarComprasCliente);


module.exports = router;