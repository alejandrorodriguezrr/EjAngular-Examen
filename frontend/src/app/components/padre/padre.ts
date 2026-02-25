import { Component } from '@angular/core';
import { ClientesServices } from '../../services/clientes-services';
import { Hijo } from "../hijo/hijo";

@Component({
  selector: 'app-padre',
  imports: [Hijo],
  templateUrl: './padre.html',
  styleUrl: './padre.css',
})
export class Padre {

  clientes: any[] = []

  constructor(private clientesServices: ClientesServices){}

  ngOnInit(){
    this.clientesServices.mostrarClientes().subscribe({
      next: (data: any) => {
        this.clientes=data
      }
    })
  }
}
