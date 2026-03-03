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

  constructor(private comprasServices: ComprasServices, private clientesServices:ClientesServices){}

  nombreCliente:string=""
  totalCompras:number=0

  ngOnInit(){

    this.clientesServices.mostrarClientes().subscribe({
      next: (clientes:any) => {
        let MaxCompras=0
        clientes.forEach((cliente:any) => {
          this.comprasServices.mostrarComprasCliente(cliente._id).subscribe({
            next:(compras:any) => {
              if(compras.length>MaxCompras){
                MaxCompras=compras.length
                this.nombreCliente=cliente.nombre
              }
            }
          })
        });
      }
    })

    this.comprasServices.mostrarCompras().subscribe({
      next: (compras:any) => {
        this.totalCompras=compras.length
      }
    })
  }
}
