import { Component } from '@angular/core';
import { FormsModule } from "@angular/forms";
import { ClientesServices } from '../../services/clientes-services';
import { ComprasServices } from '../../services/compras-services';
import { Hijo } from "../hijo/hijo";

@Component({
  selector: 'app-padre',
  imports: [FormsModule, Hijo],
  templateUrl: './padre.html',
  styleUrl: './padre.css',
})
export class Padre {

  productoabuscar:string=""
  nombreUsuarios: string[]=[]

  constructor(private comprasServices:ComprasServices){}

  buscarProducto(){

    this.comprasServices.mostrarCompras().subscribe({
      next: (compras:any) => {
        compras.forEach((compra:any) => {
          compra.libros.forEach((libro:any) => {
            if(this.productoabuscar===libro.titulo){
              this.nombreUsuarios.push(compra.clienteId.nombre)
            }
          });
        });
      } 
    })
  }
}
