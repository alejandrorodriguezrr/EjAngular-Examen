import { Component } from '@angular/core';
import { Hijo } from "../hijo/hijo";
import { ClientesServices } from '../../services/clientes-services';

@Component({
  selector: 'app-padre',
  imports: [Hijo],
  templateUrl: './padre.html',
  styleUrl: './padre.css',
})
export class Padre {

  constructor(private clienteServices: ClientesServices){}

  mandaralHijo:string=""
  recibir:string=""

  ngOnInit(){
    this.pasaralPadre()
  }

  pasaralPadre(){
    const userRaw = localStorage.getItem('user');
    if (!userRaw) {
      alert('Debes iniciar sesión para realizar una compra');
      return;
    }

    const cliente = JSON.parse(userRaw);
    const clienteId = cliente._id ?? cliente.id;

    if (!clienteId) {
      console.error('Usuario sin ID:', cliente);
      alert('Error: el usuario logueado no tiene ID. Revisa el login.');
      return;
    }

    this.mandaralHijo=cliente.nombre

  }
}
