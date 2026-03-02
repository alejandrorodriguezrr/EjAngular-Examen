import { NgFor, NgIf } from '@angular/common';
import { Component, Input } from '@angular/core';
import { ComprasServices } from '../../services/compras-services';
import { ClientesServices } from '../../services/clientes-services';

@Component({
  selector: 'app-hijo',
  imports: [NgFor, NgIf],
  templateUrl: './hijo.html',
  styleUrl: './hijo.css',
})
export class Hijo {

  @Input() reciboPadre: string[] = []

  ningunaCompra: string[] = []

  constructor(private comprasServices: ComprasServices){}

  comparar(){

    this.comprasServices.mostrarCompras().subscribe({
      next: (compras:any) => {
        
        this.reciboPadre.forEach((cliente:any) => {
          compras.forEach((compra:any) => {
            if(compra.clienteId===cliente._id){
              this.ningunaCompra.push(cliente)
            }
          });
        })
      }
    });
  }
}
 

