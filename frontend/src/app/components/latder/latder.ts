import { Component } from '@angular/core';
import { Carrito } from "../carrito/carrito";
import { ComprasServices } from '../../services/compras-services';
import { CarritoService } from '../../services/carrito-services';

@Component({
  selector: 'app-latder',
  imports: [Carrito],
  templateUrl: './latder.html',
  styleUrl: './latder.css',
})
export class Latder {

  constructor(private comprasServices:ComprasServices, private carritoServices:CarritoService){}

  productos:string[]=[]

  ngOnInit(){
    const userRaw = localStorage.getItem('user');
    if (!userRaw) {
      alert('Debes iniciar sesión para realizar una compra');
      return;
    }

    const cliente = JSON.parse(userRaw);
    const clienteId = cliente._id ?? cliente.id;

    this.comprasServices.mostrarComprasCliente(clienteId).subscribe({
      next: (compras:any) => {
        this.productos=[]

        compras.forEach((compra:any) => {
          compra.libros.forEach((libro:any) => {
            this.productos.push(libro.titulo)
          });
        });

        this.carritoServices.carrito$.subscribe({
          next: (item:any) => {
            if(!this.productos.includes(item.libro.titulo)){
              this.comprasServices.crearCompra(item.libro.titulo)
            }
          }
        })
      }
    })
  }
}
