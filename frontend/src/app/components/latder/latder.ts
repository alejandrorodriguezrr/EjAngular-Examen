import { Component } from '@angular/core';
import { Carrito } from "../carrito/carrito";
import { ComprasServices } from '../../services/compras-services';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-latder',
  imports: [Carrito,FormsModule],
  templateUrl: './latder.html',
  styleUrl: './latder.css',
})
export class Latder {

  constructor(private comprasServices:ComprasServices){}

  productoAbuscar=""
  numerodeveces=0

  buscarLibro(){
    this.comprasServices.mostrarCompras().subscribe({
      next: (compras:any) => {
        let cont=0

        compras.forEach((compra:any) => {
          compra.libros.forEach((libro:any)=> {
            if(libro.titulo==this.productoAbuscar){
              cont+=libro.cantidad
            }
          });
        });
        this.numerodeveces=cont
      }
    })
  }
}
