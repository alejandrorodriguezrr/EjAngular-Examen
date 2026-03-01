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

  constructor(private comprasServices: ComprasServices){}

  ngOnInit(){
    this.numeroCompras()
  }

  numeroComprasTotal:number=0
  mensajeHijo: string=""

  numeroCompras(){
    const userRaw = localStorage.getItem('user');
    if (!userRaw) {
      alert('Debes iniciar sesión para realizar una compra');
      return;
    }

    const cliente = JSON.parse(userRaw);
    const clienteId = cliente._id ?? cliente.id;

    this.comprasServices.mostrarComprasCliente(clienteId).subscribe({
      next: (compras:any) => {

        let num = compras.length
        
        if(num>0){
          this.numeroComprasTotal=num
        }

      }
    })
  }

}
