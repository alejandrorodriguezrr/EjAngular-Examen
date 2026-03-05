const mongoose = require ('mongoose');
const {Schema} = mongoose;

const proveedorEsquema = new Schema({

nombre: {type: String, required: true},
ciudad:{type: String, required: true},
pais: {type: String, required: true},

});

module.exports = mongoose.model('Proveedor', proveedorEsquema);

