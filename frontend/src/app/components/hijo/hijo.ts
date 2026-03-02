import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import { ClientesServices } from '../../services/clientes-services';

@Component({
  selector: 'app-hijo',
  imports: [],
  templateUrl: './hijo.html',
  styleUrl: './hijo.css',
})
export class Hijo {

  @Input() recogePadre: string=""
  @Output() mandarPadre=new EventEmitter<string>()

  constructor(private clientesServices:ClientesServices){}

  ngOnChanges(changes: SimpleChanges){
    if(changes['recogePadre']){
      this.clientesServices.mostrarClientes().subscribe({
        next: (clientes:any) => {
          clientes.forEach((cliente:any) => {
            if(cliente.nombre!=this.recogePadre){
              this.clientesServices.borrarCliente(cliente._id).subscribe()
            }
          });
          this.mandarPadre.emit("Clientes borrados")
        }
      })
    }
  }


}
