export class ComprasModel {

  _id: string;
  clienteId: string;
  libros: {
    libroId: string;
    titulo: string;
    autor: string;
    precio: number;
    cantidad: number;
    imagen?: string;
  }[];
  fecha: Date;
  total: number;

  constructor() {
    this._id = "";
    this.clienteId = "";
    this.libros = [];
    this.fecha = new Date();
    this.total = 0;
  }
}
