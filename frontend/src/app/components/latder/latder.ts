import { Component } from '@angular/core';
import { Carrito } from "../carrito/carrito";
import { ComprasServices } from '../../services/compras-services';
import { ClientesServices } from '../../services/clientes-services';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-latder',
  imports: [Carrito,NgFor],
  templateUrl: './latder.html',
  styleUrl: './latder.css',
})
export class Latder {

  constructor(private comprasServices: ComprasServices, private clientesServices: ClientesServices){}

  productoMaCaro:string=""
  nombres:string[]=[]

  ngOnInit(){
    this.comprasServices.mostrarCompras().subscribe({
      next: (compras:any) => {
        let MaxCaro = 0
        compras.forEach((compra:any) => {
          compra.libros.forEach((libro:any) => {
            if(libro.precio>MaxCaro){
              MaxCaro=libro.precio
              this.productoMaCaro=libro.titulo
            }
          });
        });

        compras.forEach((compra: any) => {
          compra.libros.forEach((libro:any)=> {

            if(libro.titulo===this.productoMaCaro){
              if(!this.nombres.includes(compra.clienteId.nombre)){
                this.nombres.push(compra.clienteId.nombre)
              }
            }
          });
        });
      }
    })
  }
}
