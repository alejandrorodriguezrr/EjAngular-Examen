import { Component } from '@angular/core';
import { ComprasServices } from '../../services/compras-services';
import { ClientesServices } from '../../services/clientes-services';

@Component({
  selector: 'app-nuevo',
  imports: [],
  templateUrl: './nuevo.html',
  styleUrl: './nuevo.css',
})
export class Nuevo {

  comprasCliente: any[] = []; 
  cargando: boolean = false;
  error: string = '';
  clienteId: string = '';
  sinCompras: boolean = false;

  constructor(private comprasService: ComprasServices,
    private clientesService: ClientesServices
  ){}

  eliminarClienteSinCompras(){

    this.clientesService.mostrarClientes().subscribe({
      next: (clientes:any) => {
        clientes.forEach((cliente: any) => {
          this.comprasService.mostrarComprasCliente(cliente._id).subscribe({
          next: (compras: any) => {
            if(compras.length === 0){
              this.clientesService.borrarCliente(cliente._id).subscribe()
            }
          }
        })
        });
      }
    })
  }
}
