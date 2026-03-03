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

  ngOnInit(){

    this.comprasServices.mostrarCompras().subscribe({
      next: (compras:any) => {
        let MaxPedidos=0
        let topId=""

        compras.forEach((compra:any) => {
          let pedidosCliente=0
          compras.forEach((c:any) => {
            if(c.clienteId === compra.clienteId){
              pedidosCliente+++
            }
          });
        });
      }
    })
  }
}
