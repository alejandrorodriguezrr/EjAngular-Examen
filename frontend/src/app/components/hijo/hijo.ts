import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import { ClientesServices } from '../../services/clientes-services';
import { ComprasServices } from '../../services/compras-services';

@Component({
  selector: 'app-hijo',
  imports: [],
  templateUrl: './hijo.html',
  styleUrl: './hijo.css',
})
export class Hijo {

  @Input() recojoHijo: number=0
  @Output() mandoAlPadre=new EventEmitter<any[]>()
  clientes:any[]=[]

  constructor(private clientesServices: ClientesServices, private comprasServices: ComprasServices){}

  ngOnChanges(changes: SimpleChanges){
    if(changes["recojoHijo"]){
      this.clientesServices.mostrarClientes().subscribe({
        next: (clientes:any) => {
          this.clientes=clientes
          const resultado: any[]=[]

          clientes.forEach((cliente: any) => {
            this.comprasServices.mostrarComprasCliente(cliente._id).subscribe({
              next: (compras: any) => {
                resultado.push({
                  nombre: cliente.nombre,
                  numCompras: compras.length
                });
                if (resultado.length === clientes.length) {
                  this.mandoAlPadre.emit(resultado);
                }
              }
            });
          });
        }
      })
    }
  }
}
