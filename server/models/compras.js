const mongoose = require('mongoose');
const { Schema } = mongoose;

const compraSchema = new Schema({

  clienteId: {
    type: Schema.Types.ObjectId,
    ref: 'Cliente',
    required: true
  },

  libros: [
    {
      libroId: { type: Schema.Types.ObjectId, ref: 'Libros', required: true },
      titulo: String,
      autor: String,
      precio: Number,
      cantidad: Number,
      imagen: String
    }
  ],

  fecha: {
    type: Date,
    default: Date.now
  },

  total: {
    type: Number,
    default: 0
  }

});

module.exports = mongoose.model('Compra', compraSchema);
