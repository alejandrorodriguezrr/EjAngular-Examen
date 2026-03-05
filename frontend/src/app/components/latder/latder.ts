import { Component } from '@angular/core';
import { Carrito } from "../carrito/carrito";
import { ComprasServices } from '../../services/compras-services';
import { ClientesServices } from '../../services/clientes-services';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-latder',
  imports: [Carrito, FormsModule],
  templateUrl: './latder.html',
  styleUrl: './latder.css',
})
export class Latder {

  constructor(private comprasServices: ComprasServices, private clientesServices:ClientesServices){}

  productoaBuscar: string=""
  contador: number=0

  buscar(){

    this.clientesServices.mostrarClientes().subscribe({
      next: (clientes:any) => {
        clientes.forEach((cliente:any) => {
          this.comprasServices.mostrarComprasCliente(cliente._id).subscribe({
            next: (compras:any) => {
              compras.forEach((compra:any) => {
                compra.libros.forEach((libro:any) => {
                  if(libro.titulo==this.productoaBuscar){
                    this.contador++
                  }
                });
              });
            }
          })      
        });
      }
    })

  }

}
