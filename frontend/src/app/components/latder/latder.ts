import { Component } from '@angular/core';
import { Carrito } from "../carrito/carrito";
import { ComprasServices } from '../../services/compras-services';
import { ClientesServices } from '../../services/clientes-services';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-latder',
  imports: [Carrito, CommonModule],
  templateUrl: './latder.html',
  styleUrl: './latder.css',
})
export class Latder {

  constructor(private comprasServices: ComprasServices, private clientesServices: ClientesServices){}
  nombreCliente: string=""
  totalEuros:number=0

  ngOnInit(){

    this.comprasServices.mostrarCompras().subscribe({
      next: (compras:any) => {
        let MaxCompras=0
        let topId: string=""
        compras.forEach((compra:any)=> {
          let cantidadCompra=0
          compra.libros.forEach((libro:any) => {
            cantidadCompra+=libro.cantidad
          });

          if(cantidadCompra>MaxCompras){
            MaxCompras=cantidadCompra
            topId=compra.clienteId._id
            this.totalEuros=compra.total
          }
        });

        this.clientesServices.mostrarCliente(topId).subscribe({
          next: (cliente:any) => {
            this.nombreCliente=cliente.nombre
          }
        })
      }
    })
  }
}
