import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class Proveedor {
  URL = 'http://localhost:5050/api/proveedores/'; 

  constructor(private http: HttpClient) {}

  crearProveedor(proveedor:any) {
    return this.http.post(this.URL, proveedor);
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
