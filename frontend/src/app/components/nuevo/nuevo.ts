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

  constructor(private clientesServices: ClientesServices, private comprasServices: ComprasServices){}

  eliminar(){
    this.clientesServices.mostrarClientes().subscribe({
      next: (clientes:any) => {
        clientes.forEach((cliente:any) => {
          this.comprasServices.mostrarComprasCliente(cliente._id).subscribe({
            next: (compras:any) => {
              if(compras.length==0){
                this.clientesServices.borrarCliente(cliente._id).subscribe()
              }
            }
          })
        });
      }
    })
  }

}
