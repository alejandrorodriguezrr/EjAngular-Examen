import { Component } from '@angular/core';
import { Hijo } from "../hijo/hijo";

@Component({
  selector: 'app-padre',
  imports: [Hijo],
  templateUrl: './padre.html',
  styleUrl: './padre.css',
})
export class Padre {

  nombreUsuario=""
  idUsuario=""
  emailRecibido=""

  ngOnInit(): void {
  const texto = localStorage.getItem('user');

  if (texto) {
    const usuario = JSON.parse(texto);

    this.nombreUsuario = usuario.nombre ?? usuario.name ?? usuario.usuario ?? usuario.username ?? '';
    this.idUsuario = String(usuario._id ?? usuario.id ?? usuario.clienteId ?? '');
  }
}

  recibirEmail(email: string): void{
    this.emailRecibido=email
  }

}
