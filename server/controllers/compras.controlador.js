const controladorCompras = {};
const comprasModel = require('../models/compras');
const librosModel = require('../models/libros');
const clientesModel = require('../models/clientes');

controladorCompras.crearCompra = async (req, res) => {
  try {
    const { clienteId, libros } = req.body;

    const clienteExiste = await clientesModel.findById(clienteId);
    if (!clienteExiste) {
      return res.status(404).json({ status: 'ERROR', message: 'Cliente no encontrado' });
    }

    let total = 0;

    for (let item of libros) {
      const libro = await librosModel.findById(item.libroId);

      if (!libro) {
        return res.status(404).json({ status: 'ERROR', message: `Libro ${item.libroId} no encontrado` });
      }

      if (libro.stock < item.cantidad) {
        return res.status(400).json({
          status: 'ERROR',
          message: `Stock insuficiente para "${libro.titulo}". Disponible: ${libro.stock}, Solicitado: ${item.cantidad}`
        });
      }

      total += libro.precio * item.cantidad;
    }

    const nuevaCompra = new comprasModel({
      clienteId,
      libros,   
      total
    });

    await nuevaCompra.save();

    for (let item of libros) {
      await librosModel.findByIdAndUpdate(
        item.libroId,
        { $inc: { stock: -item.cantidad } }
      );
    }

    res.json({ status: 'COMPRA GUARDADA', compra: nuevaCompra });

  } catch (error) {
    res.status(500).json({ status: 'ERROR', message: error.message });
  }
};

controladorCompras.mostrarCompras = async (req, res) => {
  try {
    const compras = await comprasModel.find()
      .populate('clienteId', 'nombre apellidos email');

    res.json(compras);
  } catch (error) {
    res.status(500).json({ status: 'ERROR', message: error.message });
  }
};

controladorCompras.mostrarCompra = async (req, res) => {
  try {
    const compra = await comprasModel.findById(req.params.id)
      .populate('clienteId', 'nombre apellidos email direccion telefono');

    if (!compra) {
      return res.status(404).json({ status: 'ERROR', message: 'Compra no encontrada' });
    }

    res.json(compra);
  } catch (error) {
    res.status(500).json({ status: 'ERROR', message: error.message });
  }
};

controladorCompras.mostrarComprasCliente = async (req, res) => {
  try {
    const compras = await comprasModel.find({ clienteId: req.params.clienteId });
    res.json(compras);
  } catch (error) {
    res.status(500).json({ status: 'ERROR', message: error.message });
  }
};

controladorCompras.borrarCompra = async (req, res) => {
  try {
    const compra = await comprasModel.findByIdAndDelete(req.params.id);

    if (!compra) {
      return res.status(404).json({ status: 'ERROR', message: 'Compra no encontrada' });
    }

    res.json({ status: 'COMPRA ELIMINADA', compra });
  } catch (error) {
    res.status(500).json({ status: 'ERROR', message: error.message });
  }
};

module.exports = controladorCompras;
