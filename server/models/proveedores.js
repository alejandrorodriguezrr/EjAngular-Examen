const mongoose = require ('mongoose');
const {Schema} = mongoose;

const proveedoresEsquema = new Schema({

nombre: {type: String, required: true},
pais:{type: String, required: true},
ciudad: {type: String, required: true},

});

module.exports = mongoose.model('Proovedores', proveedoresEsquema);

