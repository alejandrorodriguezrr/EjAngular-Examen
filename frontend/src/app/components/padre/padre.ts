import { Component } from '@angular/core';
import { ComprasServices } from '../../services/compras-services';
import { Hijo } from "../hijo/hijo";

@Component({
  selector: 'app-padre',
  imports: [Hijo],
  templateUrl: './padre.html',
  styleUrl: './padre.css',
})
export class Padre {

  constructor(private comprasService: ComprasServices){}

  numeroCompras: number=0

  ngOnInit(){
    const userRaw = localStorage.getItem('user');
    if (!userRaw) {
      alert('Debes iniciar sesión para realizar una compra');
      return;
    }

    const cliente = JSON.parse(userRaw);
    const clienteId = cliente._id ?? cliente.id;

    this.comprasService.mostrarComprasCliente(clienteId).subscribe({
      next: (compra:any) => {
        this.numeroCompras=compra.length
      }
    })
  }

}
