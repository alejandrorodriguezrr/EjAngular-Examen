import { CommonModule, NgFor } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Padre } from '../padre/padre';
import { FormsModule } from '@angular/forms';
import { ComprasServices } from '../../services/compras-services';
import { ClientesServices } from '../../services/clientes-services';

@Component({
  selector: 'app-hijo',
  imports: [CommonModule,FormsModule, NgFor],
  templateUrl: './hijo.html',
  styleUrl: './hijo.css',
})
export class Hijo {

  @Input() numClientes:number = 0
  @Output() mandarPadre = new EventEmitter<any[]>()

  resultado:any[]=[]

  constructor(private comprasServices:ComprasServices,
    private clientesServices: ClientesServices
  ){}

  ngOnInit(){

    if(this.numClientes>0){
      this.clientesServices.mostrarClientes().subscribe({
        next: (clientes:any) => {
          clientes.forEach((cliente:any) => {
            this.comprasServices.mostrarComprasCliente(cliente._id).subscribe({
            next: (compras:any) => {

              this.resultado.push({
                cliente: cliente.nombre,
                compras: compras.length  
              })
              this.mandarPadre.emit(this.resultado)           
            }
          })
          });
        }
      })
    }

    

  }


}
