const controladorProveedor = {};
const proveedorModel = require('../models/proveedores');

controladorProveedor.crearCliente = async(req, res) => {

    const nuevoCliente = new clienteModel(req.body);

    await nuevoCliente.save();
    res.json({'status' : 'CLIENTE GUARDADO'});

};

controladorProveedor.mostrarClientes = async(req, res) => {
    
    const leerClientes = await proveedorModel.find();
    res.json(leerClientes); 
     
};

controladorProveedor.mostrarCliente = async(req, res) => {
    const buscarCliente = await proveedorModel.findById(req.params.id);
    res.json(buscarCliente);
};

controladorProveedor.borrarCliente = async(req, res) => {
    
    const buscarCliente = await proveedorModel.findByIdAndDelete(req.params.id);
    res.json(buscarCliente);
};

module.exports = controladorProveedor;