import { Component } from '@angular/core';
import { ComprasServices } from '../../services/compras-services';

@Component({
  selector: 'app-nuevo',
  imports: [],
  templateUrl: './nuevo.html',
  styleUrl: './nuevo.css',
})
export class Nuevo {

  constructor(private comprasServices:ComprasServices){}

  nombreProducto=""

  buscar(){
    this.comprasServices.mostrarCompras().subscribe({
      next: (compras:any) => {
        let Caro=0
        compras.forEach((compra:any) => {
          compra.libros.forEach((libro:any) => {
            if(libro.precio>Caro){
              Caro=libro.precio
              this.nombreProducto=libro.titulo
            }
          });
        });
      }
    })
  }

}
