const controladorLibros = {};
const librosModels = require('../models/libros');
const fs = require('fs');
const path = require('path');

controladorLibros.mostrarLibros = async(req, res) => {
    const leerlibros = await librosModels.find();
    res.json(leerlibros); 
};

controladorLibros.crearLibros = async(req, res) => {
    try {
        const nuevolibro = new librosModels(req.body);
        
        if (req.file) {
            nuevolibro.imagen = req.file.filename;
        }

        await nuevolibro.save();
        res.json({'status': 'LIBRO GUARDADO', 'libro': nuevolibro});
        
    } catch (error) {
        if (req.file) {
            fs.unlinkSync(req.file.path);
        }
        res.status(500).json({'status': 'ERROR', 'message': error.message});
    }
};

controladorLibros.mostrarLibro = async(req, res) => {
    const buscarlibro = await librosModels.findById(req.params.id);
    res.json(buscarlibro);
};

controladorLibros.editarLibro = async(req, res) => {
    try {
        const { id } = req.params;
        
        const libroActual = await librosModels.findById(id);
        
        const libroeditar = {
            titulo: req.body.titulo,
            autor: req.body.autor,
            editorial: req.body.editorial,
            genero: req.body.genero,
            precio: req.body.precio,
            stock: req.body.stock
        };

        if (req.file) {
            libroeditar.imagen = req.file.filename;
            
            if (libroActual.imagen && libroActual.imagen !== 'default.png') {
                const oldImagePath = path.join(__dirname, '../uploads/', libroActual.imagen);
                if (fs.existsSync(oldImagePath)) {
                    fs.unlinkSync(oldImagePath);
                }
            }
        }

        await librosModels.findByIdAndUpdate(id, {$set: libroeditar}, {new: true});
        res.json({'status': 'LIBRO ACTUALIZADO'});
        
    } catch (error) {
        if (req.file) {
            fs.unlinkSync(req.file.path);
        }
        res.status(500).json({'status': 'ERROR', 'message': error.message});
    }
};

controladorLibros.borrarLibro = async(req, res) => {
    try {
        const buscarlibro = await librosModels.findByIdAndDelete(req.params.id);
        
        if (buscarlibro.imagen && buscarlibro.imagen !== 'default.png') {
            const imagePath = path.join(__dirname, '../uploads/', buscarlibro.imagen);
            if (fs.existsSync(imagePath)) {
                fs.unlinkSync(imagePath);
            }
        }
        
        res.json(buscarlibro);
        
    } catch (error) {
        res.status(500).json({'status': 'ERROR', 'message': error.message});
    }
};

controladorLibros.mostrarGeneros = async (req, res) => {
    try {
        const generos = await librosModels.distinct('genero');

        const generosLimpios = generos
            .filter(g => typeof g === 'string' && g.trim() !== '')
            .map(g => g.trim())
            .sort((a, b) => a.localeCompare(b));

        res.json(generosLimpios);
    } catch (error) {
        res.status(500).json({ status: 'ERROR', message: error.message });
    }
};


module.exports = controladorLibros;