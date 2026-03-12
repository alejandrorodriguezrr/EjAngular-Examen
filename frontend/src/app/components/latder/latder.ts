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

  constructor(private comprasService:ComprasServices){}

  primerProducto=""
  ultimoProducto=""

  ngOnInit(){

    this.comprasService.mostrarCompras().subscribe({
      next:(compras:any) => {
            this.primerProducto=compras[0].libros[0].titulo

            const ultimaCompra=compras[compras.length-1]

            this.ultimoProducto=ultimaCompra.libros[ultimaCompra.libros.length-1].titulo
      }
    })

  }
}
