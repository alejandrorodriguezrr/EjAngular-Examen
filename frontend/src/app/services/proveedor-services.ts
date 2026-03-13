import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ProveedorModel } from '../models/proveedor-model';

@Injectable({
  providedIn: 'root',
})
export class ProveedorServices {

  URL = 'http://localhost:5050/api/proveedores/';

  constructor(private http: HttpClient) {}

  crearProveedor(compra: Omit<ProveedorModel, '_id'>) {
    return this.http.post(this.URL, compra);
  }

  mostrarProveedores() {
    return this.http.get(this.URL);
  }

  mostrarProveedor(id: string) {
    return this.http.get(this.URL + id);
  }

  borrarProveedor(id: string) {
    return this.http.delete(this.URL + id);
  }
}

