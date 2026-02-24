const controladorClientes = {};
const clienteModel = require('../models/clientes');

controladorClientes.autenticar = async(req, res) => {
    try {
        const { email, password } = req.body;
        
        const clienteEncontrado = await clienteModel.findOne({ 
            email: email, 
            password: password 
        });
        
        if (clienteEncontrado) {
            res.json({
                autenticado: true,
                cliente: clienteEncontrado
            });
        } else {
            res.json({ autenticado: false });
        }
        
    } catch (error) {
        res.status(500).json({ 
            autenticado: false, 
            error: 'Error en el servidor' 
        });
    }
};

controladorClientes.crearCliente = async(req, res) => {

    const nuevoCliente = new clienteModel(req.body);

    await nuevoCliente.save();
    res.json({'status' : 'CLIENTE GUARDADO'});

};

controladorClientes.mostrarClientes = async(req, res) => {
    
    const leerClientes = await clienteModel.find();
    res.json(leerClientes); 
     
};

controladorClientes.mostrarCliente = async(req, res) => {
    const buscarCliente = await clienteModel.findById(req.params.id);
    res.json(buscarCliente);
};

controladorClientes.editarCliente = async(req, res) => {

    const { id } = req.params;    

    const clienteEditar = {
        nombre: req.body.nombre,
        apellidos: req.body.apellidos,
        email: req.body.email,
        password: req.body.password,
        direccion: req.body.direccion,
        telefono: req.body.telefono
    };

    await clienteModel.findByIdAndUpdate(id, {$set: clienteEditar}, {new: true});
    res.json({'status' : 'CLIENTE ACTUALIZADO'});

};

controladorClientes.borrarCliente = async(req, res) => {
    
    const buscarCliente = await clienteModel.findByIdAndDelete(req.params.id);
    res.json(buscarCliente);
};

module.exports = controladorClientes;