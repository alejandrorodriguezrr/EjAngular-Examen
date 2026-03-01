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

  constructor(private clientesServices:ClientesServices,
      private comprasServices:ComprasServices){}

    borrarUsuarios(){

      this.clientesServices.mostrarClientes().subscribe({
        next: (clientes:any) => {
                            console.log("cantidad",clientes._id)

          clientes.forEach((cliente:any) => {
                              console.log("cantidad",cliente)

            this.comprasServices.mostrarComprasCliente(cliente._id).subscribe({
              
              next: (compra:any) => {
                if(compra.length==0){
                  console.log("cantidad",compra.cantidad)
                  this.clientesServices.borrarCliente(cliente._id).subscribe()
                }
              }
            })
          });
        }
      })

    }
}
