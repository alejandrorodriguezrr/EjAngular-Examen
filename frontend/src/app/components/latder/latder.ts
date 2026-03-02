import { Component } from '@angular/core';
import { Carrito } from "../carrito/carrito";
import { FormsModule } from '@angular/forms';
import { ComprasServices } from '../../services/compras-services';

@Component({
  selector: 'app-latder',
  imports: [Carrito,FormsModule],
  templateUrl: './latder.html',
  styleUrl: './latder.css',
})
export class Latder {

  productoabuscar:string=""
  contador:number=0

  constructor(private comprasService: ComprasServices){}

  buscador(){
    this.comprasService.mostrarCompras().subscribe({
      next: (compras:any)=>{
        let total=0

        compras.forEach((compra:any) => {
            compra.libros.forEach((libro:any) => {
              if(this.productoabuscar===libro.titulo){
                total++
              }
            });
        this.contador=total
        });
      }
    })
  }

}
