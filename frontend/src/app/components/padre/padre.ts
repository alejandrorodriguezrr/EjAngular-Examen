import { Component } from '@angular/core';
import { ClientesServices } from '../../services/clientes-services';
import { Hijo } from '../hijo/hijo';

@Component({
  selector: 'app-padre',
  imports: [Hijo],
  templateUrl: './padre.html',
  styleUrl: './padre.css',
})
export class Padre {

  constructor(private clientesServices: ClientesServices){}

  mandarTodos: string[] = []

  ngOnInit(){
    this.clientesServices.mostrarClientes().subscribe({
      next: (clientes: any) => {
        clientes.forEach((cliente:any) => {
          this.mandarTodos.push(cliente.nombre)
        });
      }
    })
  }
}
