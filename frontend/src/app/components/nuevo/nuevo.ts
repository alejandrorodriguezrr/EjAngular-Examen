import { Component } from '@angular/core';
import { ComprasServices } from '../../services/compras-services';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-nuevo',
  imports: [NgIf],
  templateUrl: './nuevo.html',
  styleUrl: './nuevo.css',
})
export class Nuevo {

  constructor(private comprasServices: ComprasServices){}

  nombreProducto: string=""

  productoMasCaro(){

    this.comprasServices.mostrarCompras().subscribe({
      next: (compras:any) => {
        let MaxCaro=0

        compras.forEach((compra:any) => {
          compra.libros.forEach((libro:any) => {
            if(libro.precio>MaxCaro){
              MaxCaro=libro.precio
              this.nombreProducto=libro.titulo
            }
          })
        });
      }
    })

  }
}
