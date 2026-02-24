const express = require('express');
const router = express.Router();
const upload = require('../multer.config');

const lblcontrol = require('../controllers/libros.controlador.js');

router.get('/', lblcontrol.mostrarLibros);

router.get('/generos', lblcontrol.mostrarGeneros);

router.post('/', upload.single('imagen'), lblcontrol.crearLibros);

router.get('/:id', lblcontrol.mostrarLibro);

router.put('/:id', upload.single('imagen'), lblcontrol.editarLibro);

router.delete('/:id', lblcontrol.borrarLibro);

module.exports = router;