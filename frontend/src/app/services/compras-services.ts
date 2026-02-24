import { Injectable } from '@angular/core';
import { ComprasModel } from '../models/compras-model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ComprasServices {
  compraSeleccionada: ComprasModel;
  compras: ComprasModel[];
  URL = 'http://localhost:5050/api/compras/';

  constructor(private http: HttpClient) {
    this.compraSeleccionada = new ComprasModel();
    this.compras = [];
  }

  crearCompra(compra: Omit<ComprasModel, '_id'>) {
    return this.http.post(this.URL, compra);
  }

  mostrarCompras() {
    return this.http.get(this.URL);
  }

  mostrarCompra(id: string) {
    return this.http.get(this.URL + id);
  }

  mostrarComprasCliente(clienteId: string) {
    return this.http.get(this.URL + 'cliente/' + clienteId);
  }

  borrarCompra(id: string) {
    return this.http.delete(this.URL + id);
  }
}
