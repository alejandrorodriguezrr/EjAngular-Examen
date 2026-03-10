import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NgFor } from '@angular/common';
import { ComprasServices } from '../../services/compras-services';
import { ClientesServices } from '../../services/clientes-services';

@Component({
  selector: 'app-hijo',
  imports: [NgFor],
  templateUrl: './hijo.html',
  styleUrl: './hijo.css',
})
export class Hijo {

  @Input() reciboPadre:string[]=[]
  @Output() envioPadre = new EventEmitter<any[]>()

  constructor(private comprasServices:ComprasServices, private clientesServices: ClientesServices){}

  ngOnChanges(){

    this.clientesServices.mostrarClientes().subscribe({
      next: (clientes:any) => {
        const sincompras:string[]=[]
        clientes.forEach((cliente:any) => {
          this.comprasServices.mostrarComprasCliente(cliente._id).subscribe({
            next: (compras:any) => {
              if(compras.length==0){
                sincompras.push(cliente.nombre)
              }
              this.envioPadre.emit(sincompras)
            }
          })
        });
      }
    })
  }


}
