import { Injectable } from '@angular/core';
import { ClientesModel } from '../models/clientes-model';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class ClientesServices {
  clienteSeleccionado: ClientesModel;
  clientes: ClientesModel[];
  URL = 'http://localhost:5050/api/cliente/'; 

  constructor(private http: HttpClient) {
    this.clienteSeleccionado = new ClientesModel();
    this.clientes = [];
  }

  autenticarCliente(cliente: any) {
    return this.http.post(this.URL + 'login', cliente);
  }

  crearCliente(cliente: Omit<ClientesModel, '_id'>) {
    return this.http.post(this.URL, cliente);
  }

  mostrarClientes() {
    return this.http.get(this.URL);
  }

  mostrarCliente(id: string) {
    return this.http.get(this.URL + id);
  }

  actualizarCliente(cliente: ClientesModel) {
    return this.http.put(this.URL + cliente._id, cliente);
  }

  borrarCliente(id: string) {
    return this.http.delete(this.URL + id);
  }
}
