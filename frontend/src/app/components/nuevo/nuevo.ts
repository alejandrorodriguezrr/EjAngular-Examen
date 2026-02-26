import { Component } from '@angular/core';
import { ComprasServices } from '../../services/compras-services';
import { ClientesServices } from '../../services/clientes-services';
import { NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-nuevo',
  imports: [NgIf, NgFor],
  templateUrl: './nuevo.html',
  styleUrl: './nuevo.css',
})
export class Nuevo {

  mostrarClientes: any[]=[]
  clientes: any[]=[]
  indice:number=0
  clienteActual: any=null
  comprasActual: any[] = []

  constructor(private comprasService: ComprasServices,
    private clientesServices: ClientesServices
  ){}

  ngOnInit(){

    this.clientesServices.mostrarClientes().subscribe({
      next: (data:any) => {
        this.clientes=data
        this.cargarCliente()
      }
    })
  }

  cargarCliente(){

    this.clienteActual=this.clientes[this.indice]

    this.comprasService.mostrarComprasCliente(this.clienteActual._id).subscribe({
      next: (data:any) => {
        this.comprasActual=data
      }
    })
  }

  siguiente(){
    this.indice=(this.indice+1) % this.clientes.length
    this.cargarCliente
  }

}
