import { Component } from '@angular/core';
import { Carrito } from "../carrito/carrito";
import { ClientesServices } from '../../services/clientes-services';
import { ComprasServices } from '../../services/compras-services';
import { NgForOf } from "../../../../node_modules/@angular/common/types/_common_module-chunk";
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-latder',
  imports: [Carrito, NgFor],
  templateUrl: './latder.html',
  styleUrl: './latder.css',
})
export class Latder {

  constructor(private clientesServices: ClientesServices, private comprasServices:ComprasServices){}

  nombreClientes: string[]=[]
  nombreProducto: string=""

  ngOnInit(){    
    this.comprasServices.mostrarCompras().subscribe({
      next: (compras:any) => {
        let masCaro=0
        compras.forEach((compra:any) => {
          compra.libros.forEach((libro:any) => {
            if(libro.precio>masCaro){
              masCaro=libro.precio
              this.nombreProducto=libro.titulo
            }
            if(libro.titulo===this.nombreProducto){
              if(!this.nombreClientes.includes(compra.clienteId.nombre)){
                this.nombreClientes.push(compra.clienteId.nombre)
              }
            }
          });
        });
        
        
      }
    })
  }
}

