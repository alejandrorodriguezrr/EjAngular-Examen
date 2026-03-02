const mongoose = require ('mongoose');
const {Schema} = mongoose;

const ProveedoresEsquema = new Schema({

proveedor:{type: String, required: true},
ciudad: {type: String, required: true},
pais: {type: String, required: true},

});

module.exports = mongoose.model('Proveedores', ProveedoresEsquema);

