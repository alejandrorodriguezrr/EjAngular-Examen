import { Component } from '@angular/core';
import { ClientesServices } from '../../services/clientes-services';
import { ComprasServices } from '../../services/compras-services';

@Component({
  selector: 'app-nuevo',
  imports: [],
  templateUrl: './nuevo.html',
  styleUrl: './nuevo.css',
})
export class Nuevo {

  constructor(private clientesServices: ClientesServices, private comprasServices:ComprasServices){}

  nombreCliente: string=""
  numeroCompras: number=0
  totalenEuros: number=0

  ngOnInit(){

    this.comprasServices.mostrarCompras().subscribe({
      next: (compras: any) => {
        let MaxCompras=0
        let total=0
        let topId=""

        compras.forEach((compra:any) => {
          let pedidosCliente=0
          compras.forEach((c:any) => {
            if(c.clienteId === compra.clienteId){
              pedidosCliente++
            }
          });

          if(pedidosCliente>MaxCompras){
            MaxCompras=pedidosCliente
            topId=compra.clienteId.nombre
            this.nombreCliente=compra.clienteId.nombre
          }
        });
        compras.forEach((compra: any) => {
        const id = compra.clienteId._id ?? compra.clienteId;
        if(id === topId){
          total += compra.total;
        }
      });

      this.totalenEuros = total;
      }
    })
  }

}
