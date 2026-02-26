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

  elmasCaro: any=null

  constructor(private comprasService:ComprasServices){}

  calcular(){

    this.comprasService.mostrarCompras().subscribe({
      next: (data: any) => {
        const todosloslibros:any[]=[]
        data.forEach((compra:any) => {
          compra.libros.forEach((libro:any) => {
            todosloslibros.push(libro)
          })
        });
        const MaxPrecio = Math.max(...todosloslibros.map(l=>l.precio))
        const masprecio = todosloslibros.find(l=>l.precio === MaxPrecio)

        this.elmasCaro=masprecio
      }
    })
  }

}
