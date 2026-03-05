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

  constructor(private clientesServices:ClientesServices, private comprasServices: ComprasServices){}

  nombreClientes: string=""
  totalEuros: number=0

  ngOnInit(){

    this.clientesServices.mostrarClientes().subscribe({
      next: (clientes:any) => {
        let MaxCompras=0
        clientes.forEach((cliente:any) => {
          this.comprasServices.mostrarComprasCliente(cliente._id).subscribe({
            next: (compras:any) => {
              if(compras.length>MaxCompras){
                MaxCompras=compras.length
                this.nombreClientes=cliente.nombre

                this.totalEuros=0
                compras.forEach((compra:any) => {
                  compra.libros.forEach((libro:any) => {
                    this.totalEuros+=libro.precio*libro.cantidad
                  });
                });
              }
            }
          })
        });
      }
    })

  }

}
