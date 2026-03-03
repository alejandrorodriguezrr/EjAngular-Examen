import { Component } from '@angular/core';
import { Carrito } from "../carrito/carrito";
import { ComprasServices } from '../../services/compras-services';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-latder',
  imports: [Carrito,CommonModule],
  templateUrl: './latder.html',
  styleUrl: './latder.css',
})
export class Latder {

  constructor(private comprasServices: ComprasServices){}
  productoMasVendido: any=null

  ngOnInit(){
    this.comprasServices.mostrarCompras().subscribe({
      next: (compras:any) => {
        let MaxVeces=0

        compras.forEach((compra:any) => {
          compra.libros.forEach((libro:any) => {
            let veces = 0;
            compras.forEach((c:any) => {
              c.libros.forEach((l:any) => {
                if(l.titulo === libro.titulo){
                  veces++;
                }
              });
            });
            console.log(libro.titulo, 'aparece', veces, 'veces');
            if(MaxVeces < veces){
              MaxVeces = veces;
              this.productoMasVendido = libro.titulo;
            }
          });
        });
      } 
    })
  }
}
