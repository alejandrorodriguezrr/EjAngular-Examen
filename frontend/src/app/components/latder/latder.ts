import { Component } from '@angular/core';
import { Carrito } from "../carrito/carrito";
import { ComprasServices } from '../../services/compras-services';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-latder',
  imports: [Carrito, NgFor],
  templateUrl: './latder.html',
  styleUrl: './latder.css',
})
export class Latder {

  constructor(private comprasServices: ComprasServices){}

  ultimoProd:string[]=[]

  ngOnInit(){

    this.comprasServices.mostrarCompras().subscribe({
      next: (compras:any) => {
        const ultimaCompra=compras[compras.length-1]
        const ultimoProducto=ultimaCompra.libros[ultimaCompra.libros.length-1]

        for (let i=0; i<ultimoProducto.cantidad;i++){
          this.ultimoProd.push(ultimoProducto.titulo)
        }
      }
    })

  }

}
