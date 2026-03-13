import { Component } from '@angular/core';
import { Carrito } from "../carrito/carrito";
import { ClientesServices } from '../../services/clientes-services';
import { ComprasServices } from '../../services/compras-services';

@Component({
  selector: 'app-latder',
  imports: [Carrito],
  templateUrl: './latder.html',
  styleUrl: './latder.css',
})
export class Latder {

  constructor(private clienteServices:ClientesServices, private comprasServices:ComprasServices){}

  nombreCliente=""
  totalProductos=0

  ngOnInit(){
    this.clienteServices.mostrarClientes().subscribe({
      next: (clientes:any) => {
        let MaxCompras=0
        clientes.forEach((cliente:any) => {
          this.comprasServices.mostrarComprasCliente(cliente._id).subscribe({
            next: (compras:any) => {
              let totalP=0

              if(compras.length>MaxCompras){
                MaxCompras=compras.length
                this.nombreCliente=cliente.nombre

                compras.forEach((compra:any) => {
                compra.libros.forEach((libro:any) => {
                  this.totalProductos+=libro.cantidad
                });
              });
              }      
            }
          })
        });
      }
    })
  }


}
