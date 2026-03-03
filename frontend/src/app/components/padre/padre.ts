import { Component } from '@angular/core';
import { ComprasServices } from '../../services/compras-services';
import { ClientesServices } from '../../services/clientes-services';
import { Hijo } from '../hijo/hijo';

@Component({
  selector: 'app-padre',
  imports: [Hijo],
  templateUrl: './padre.html',
  styleUrl: './padre.css',
})
export class Padre {

  constructor(private comprasServices: ComprasServices, private clientesServices:ClientesServices){}

  siComprados:number=0
  noComprados:number=0

  ngOnInit(){

    this.clientesServices.mostrarClientes().subscribe({
      next: (clientes:any) => {
        clientes.forEach((cliente:any) => {
          this.comprasServices.mostrarComprasCliente(cliente._id).subscribe({
            next: (compra:any) => {
              if(compra.length>0){
                this.siComprados++
              }
            }
          })
        });
      }
    })
  }
}
