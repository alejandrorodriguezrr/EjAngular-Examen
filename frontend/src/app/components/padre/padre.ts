import { Component } from '@angular/core';
import { ClientesServices } from '../../services/clientes-services';
import { Hijo } from "../hijo/hijo";
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-padre',
  imports: [Hijo, CommonModule,FormsModule],
  templateUrl: './padre.html',
  styleUrl: './padre.css',
})
export class Padre {

  clientes:number = 0

  constructor(private clientesServices:ClientesServices){}

  ngOnInit(){
    this.clientesTotales()
  }

  clientesTotales(){
    this.clientesServices.mostrarClientes().subscribe({
      next: (data:any) => {
        console.log("num",data)
        this.clientes=data.length
      }
    })
  }

}
