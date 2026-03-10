import { Component } from '@angular/core';
import { ClientesServices } from '../../services/clientes-services';
import { Hijo } from "../hijo/hijo";
import { NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-padre',
  imports: [Hijo, NgFor],
  templateUrl: './padre.html',
  styleUrl: './padre.css',
})
export class Padre {

  nomclientes: string[]=[]
  reciboHijo: any[]=[]

  constructor(private clientesServices:ClientesServices){}

  ngOnInit(){
    this.clientesServices.mostrarClientes().subscribe({
      next: (clientes:any) => {
        clientes.forEach((cliente:any) => {
          this.nomclientes.push(cliente.nombre)
        });
      }
    })
  }


}
