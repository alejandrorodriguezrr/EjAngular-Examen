const controladorProveedor = {};
const proveedorModel = require('../models/proveedor');

controladorProveedor.crearProveedor = async(req, res) => {

    const nuevoProveedor = new proveedorModel(req.body);

    await nuevoProveedor.save();
    res.json({'status' : 'PROVEEDOR GUARDADO'});

};

controladorProveedor.mostrarProveedores = async(req, res) => {
    
    const leerProveedor = await proveedorModel.find();
    res.json(leerProveedor); 
     
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