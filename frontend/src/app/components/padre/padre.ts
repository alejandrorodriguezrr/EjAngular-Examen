import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ComprasServices } from '../../services/compras-services';
import { Hijo } from "../hijo/hijo";

@Component({
  selector: 'app-padre',
  imports: [FormsModule, Hijo],
  templateUrl: './padre.html',
  styleUrl: './padre.css',
})
export class Padre {

  productoaBuscar:string=""
  cantidadAHijo: number=0

  constructor(private comprasService: ComprasServices){}

  buscar(){
    this.comprasService.mostrarCompras().subscribe({
      next: (compras:any) => {
        let cantidadTotal=0

        compras.forEach((compra:any) => {
          compra.libros.forEach((libro:any)=> {
            if(libro.titulo===this.productoaBuscar){
              cantidadTotal+=libro.cantidad
            }
          });
        });
        this.cantidadAHijo=cantidadTotal
      }
    })
  }

  

}
