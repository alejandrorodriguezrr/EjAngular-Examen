const mongoose = require ('mongoose');
const {Schema} = mongoose;

const clienteSchema = new Schema({

    nombre: {type: String, required: true},
    apellidos:{type: String, required: true},
    email:{type: String, required: true},
    password:{type: String, required: true},
    direccion:{type: String, required: true},
    telefono:{type: Number, required: true},
    
    });
    
    module.exports = mongoose.model('Cliente', clienteSchema);