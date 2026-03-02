const controladorProveedor = {};
const proveedorModel = require('../models/proovedores');

controladorProveedor.crearProveedor = async(req, res) => {

    const nuevoCliente = new proveedorModel(req.body);

    await nuevoCliente.save();
    res.json({'status' : 'PROVEEDOR GUARDADO'});

};

controladorProveedor.mostrarProveedor = async(req, res) => {
    
    const leerClientes = await proveedorModel.find();
    res.json(leerClientes); 
     
};

controladorProveedor.mostrarProveedor = async(req, res) => {
    const buscarCliente = await proveedorModel.findById(req.params.id);
    res.json(buscarCliente);
};

controladorProveedor.borrarProveedor = async(req, res) => {
    
    const buscarCliente = await proveedorModel.findByIdAndDelete(req.params.id);
    res.json(buscarCliente);
};

module.exports = controladorProveedor;