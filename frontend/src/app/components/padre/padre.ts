import { Component } from '@angular/core';
import { Hijo } from "../hijo/hijo";

@Component({
  selector: 'app-padre',
  imports: [Hijo],
  templateUrl: './padre.html',
  styleUrl: './padre.css',
})
export class Padre {

  userLogado:string=""
  idUser:string=""
  recibirDato:string=""

  ngOnInit(){
    this.usuario()
  }

  usuario(){
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

    this.userLogado=cliente.nombre
    this.idUser=cliente._id
  }

}
