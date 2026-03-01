import { Component } from '@angular/core';
import { ComprasServices } from '../../services/compras-services';
import { Hijo } from "../hijo/hijo";

@Component({
  selector: 'app-padre',
  imports: [Hijo],
  templateUrl: './padre.html',
  styleUrl: './padre.css',
})
export class Padre {

  constructor(private comprasServices: ComprasServices){}

  productosTotales: number=0
  palabra: string=""

  ngOnInit(){

    this.comprasServices.mostrarCompras().subscribe({
      next: (data:any) => {
        data.forEach((compras:any) => {
          compras.libros.forEach((libro:any) => {
            this.productosTotales+=libro.cantidad
          });
        });
      }
    })

  }

}
