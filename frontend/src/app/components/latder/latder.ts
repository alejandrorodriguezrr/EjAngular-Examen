import { Component } from '@angular/core';
import { Carrito } from "../carrito/carrito";
import { ComprasServices } from '../../services/compras-services';

@Component({
  selector: 'app-latder',
  imports: [Carrito],
  templateUrl: './latder.html',
  styleUrl: './latder.css',
})
export class Latder {

  constructor(private comprasServices: ComprasServices){}

  nombreProducto: string=""
  precio: number=0

  ngOnInit(){
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

    this.comprasServices.mostrarComprasCliente(clienteId).subscribe({
      next: (compras:any) => {
        let MaxCaro=0
        compras.forEach((compra:any) => {
          compra.libros.forEach((libro:any) => {
            if(libro.precio>MaxCaro){
              MaxCaro=libro.precio
              this.nombreProducto=libro.titulo
            }
          });
        });
        this.precio=MaxCaro
      }
    })
  }
}
