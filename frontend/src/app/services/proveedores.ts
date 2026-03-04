import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ProveedoresModel } from '../models/proovedor-model';

@Injectable({
  providedIn: 'root',
})
export class Proveedores {
  proveedorSeleccionado: ProveedoresModel;
  proveedores: ProveedoresModel[];
  URL = 'http://localhost:5050/api/proveedor/'; 

  constructor(private http: HttpClient) {
    this.proveedorSeleccionado = new ProveedoresModel();
    this.proveedores = [];
  }

  crearCliente(cliente: Omit<ProveedoresModel, '_id'>) {
    return this.http.post(this.URL, cliente);
  }

  mostrarClientes() {
    return this.http.get(this.URL);
  }

  mostrarCliente(id: string) {
    return this.http.get(this.URL + id);
  }

  actualizarCliente(cliente: ProveedoresModel) {
    return this.http.put(this.URL + cliente._id, cliente);
  }

  borrarCliente(id: string) {
    return this.http.delete(this.URL + id);
  }
}
