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

  @Input() reciboHijo: number=0
  @Output() mandoHijo=new EventEmitter<number>()

  noComprados:number=0

  constructor(private clientesServices: ClientesServices, private comprasServices:ComprasServices){}

  ngOnChanges(changes: SimpleChanges){
    if(changes["reciboHijo"]){
      this.clientesServices.mostrarClientes().subscribe({
      next: (clientes:any) => {
        clientes.forEach((cliente:any) => {
          this.comprasServices.mostrarComprasCliente(cliente._id).subscribe({
            next: (compra:any) => {
              if(compra.length==0){
                this.noComprados++
              }
            }
          })
        });
      }
    })
    this.mandoHijo.emit(this.noComprados)
    }
  }
}
