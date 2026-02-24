const express = require('express');
const router = express.Router();

const clientesControl = require('../controllers/cliente.controlador.js');

router.post('/login', clientesControl.autenticar);

router.post('/', clientesControl.crearCliente);

router.get('/', clientesControl.mostrarClientes);

router.get('/:id', clientesControl.mostrarCliente);

router.put('/:id', clientesControl.editarCliente);

router.delete('/:id', clientesControl.borrarCliente);

module.exports = router;