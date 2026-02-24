const mongoose = require ('mongoose');
const {Schema} = mongoose;

const librosEsquema = new Schema({

titulo: {type: String, required: true},
autor:{type: String, required: true},
editorial: {type: String, required: true},
genero: {type: String, required: true},
precio: {type: Number, required: true},
stock: {type: Number, required: true},
imagen: {type: String, default: 'default.png'}

});

module.exports = mongoose.model('Libros', librosEsquema);

