import { Component } from '@angular/core';
import { Carrito } from "../carrito/carrito";
import { ComprasServices } from '../../services/compras-services';
import { ClientesServices } from '../../services/clientes-services';

@Component({
  selector: 'app-latder',
  imports: [Carrito],
  templateUrl: './latder.html',
  styleUrl: './latder.css',
})
export class Latder {

  constructor(private comprasServices: ComprasServices, private clientesServices: ClientesServices){}

  nombresClientes: string[]=[]

  ngOnInit(){

    this.clientesServices.mostrarClientes().subscribe({
      next: (clientes:any) => {
        clientes.forEach((cliente:any) => {
          this.comprasServices.mostrarComprasCliente(cliente._id).subscribe({
            next: (compras:any) => {
              let MaxCaro=0
              compras.forEach((compra:any) => {
                compra.libros.forEach((libro:any) => {
                  if(libro.precio>MaxCaro){
                    MaxCaro=libro.precio
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
