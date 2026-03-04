import { Component } from '@angular/core';
import { ClientesServices } from '../../services/clientes-services';
import { Hijo } from '../hijo/hijo';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-padre',
  imports: [Hijo, NgFor],
  templateUrl: './padre.html',
  styleUrl: './padre.css',
})
export class Padre {

  constructor(private clientesServices: ClientesServices){}

  numerodeClientes:number=0
  reciboHijo:any[]=[]

  ngOnInit(){

    this.clientesServices.mostrarClientes().subscribe({
      next: (clientes:any) => {
        this.numerodeClientes=clientes.length
      }
    })
  }

}
