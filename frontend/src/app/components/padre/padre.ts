import { Component } from '@angular/core';
import { ComprasServices } from '../../services/compras-services';
import { FormsModule } from '@angular/forms';
import { Hijo } from '../hijo/hijo';

@Component({
  selector: 'app-padre',
  imports: [FormsModule, Hijo],
  templateUrl: './padre.html',
  styleUrl: './padre.css',
})
export class Padre {

  constructor(private comprasServices: ComprasServices){}

  productoRecibido:string=""

  mandarPadre:number=0

  buscarProducto(){
    this.comprasServices.mostrarCompras().subscribe({
      next: (compras:any) => {
        let cantidad=0
        compras.forEach((compra:any)=> {
          compra.libros.forEach((libro:any) => {
            if(this.productoRecibido==libro.titulo){
              cantidad+=libro.cantidad
            }
          });
        });
        this.mandarPadre=cantidad
      }
    })
  }


}
