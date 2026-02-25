import { Component, Input } from '@angular/core';
import { ClientesServices } from '../../services/clientes-services';
import { ComprasServices } from '../../services/compras-services';
import { CommonModule, NgFor } from '@angular/common';

@Component({
  selector: 'app-hijo',
  imports: [NgFor, CommonModule],
  templateUrl: './hijo.html',
  styleUrl: './hijo.css',
})
export class Hijo {

  @Input() clientes: any[] = []
  clientesconCompras: any[] = []
  clientessinCompras: any[] = []

  constructor(private comprasServices: ComprasServices){}
  
    ngOnInit(){
      this.comprasServices.mostrarCompras().subscribe({
        next: (data: any) => {
          const idsconCompras = [...new Set(data.map((c:any)=>c.clienteId))]

          this.clientesconCompras = this.clientes.filter(cliente =>
            idsconCompras.includes(cliente._id)
          );

          this.clientessinCompras = this.clientes.filter(cliente =>
            !idsconCompras.includes(cliente._id)
          );
        }
      })
    }
}
