import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import { ComprasServices } from '../../services/compras-services';
import { ClientesServices } from '../../services/clientes-services';

@Component({
  selector: 'app-hijo',
  imports: [],
  templateUrl: './hijo.html',
  styleUrl: './hijo.css',
})
export class Hijo {

  @Input() reciboPadre: number=0
  @Output() envioPadre = new EventEmitter<any[]>()

  clientesCompras:any[]=[]

  constructor(private comprasService: ComprasServices, private clientesServices: ClientesServices){}

  ngOnChanges(changes: SimpleChanges){
    if(changes['reciboPadre'] && this.reciboPadre>0){
      this.clientesCompras=[]
      this.clientesServices.mostrarClientes().subscribe({
        next: (clientes:any) => {
          clientes.forEach((cliente:any) => {
            this.comprasService.mostrarComprasCliente(cliente._id).subscribe({
              next: (compras:any) => {
                this.clientesCompras.push({
                  nombre: cliente.nombre,
                  num_compras: compras.length
                })

                if(this.clientesCompras.length===clientes.length){
                  this.envioPadre.emit(this.clientesCompras)
                }
              }
            })
          });
        }
      })
    }
  }
}
