import { Component } from '@angular/core';
import { ComprasServices } from '../../services/compras-services';
import { Hijo } from '../hijo/hijo';
import { ClientesServices } from '../../services/clientes-services';

@Component({
  selector: 'app-padre',
  imports: [Hijo],
  templateUrl: './padre.html',
  styleUrl: './padre.css',
})
export class Padre {

  constructor(private comprasService: ComprasServices, private clientesServices: ClientesServices){}

  nombresSincomprar: string[]=[]
  totalSinComprar:number=0

  ngOnInit(){

    this.clientesServices.mostrarClientes().subscribe({
      next: (clientes:any) => {

        clientes.forEach((cliente:any) => {
          this.comprasService.mostrarComprasCliente(cliente._id).subscribe({
            next: (compra:any) => {
              if(compra.length==0){
                this.nombresSincomprar = [...this.nombresSincomprar, cliente.nombre];
              }
            }
          })
        });
      }
    })
  }
}
