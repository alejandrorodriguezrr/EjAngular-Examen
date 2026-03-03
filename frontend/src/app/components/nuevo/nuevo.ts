import { Component } from '@angular/core';
import { ComprasServices } from '../../services/compras-services';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-nuevo',
  imports: [NgFor],
  templateUrl: './nuevo.html',
  styleUrl: './nuevo.css',
})
export class Nuevo {

  constructor(private comprasServices: ComprasServices){}

  productosRepetidos:any[]=[]

  ngOnInit(){

    const userRaw = localStorage.getItem('user');
    if (!userRaw) {
      alert('Debes iniciar sesión para realizar una compra');
      return;
    }

    const cliente = JSON.parse(userRaw);
    const clienteId = cliente._id ?? cliente.id;

    if (!clienteId) {
      console.error('Usuario sin ID:', cliente);
      alert('Error: el usuario logueado no tiene ID. Revisa el login.');
      return;
    }

    this.comprasServices.mostrarComprasCliente(clienteId).subscribe({
      next: (compras:any) => {
        const ultimaCompra=compras[compras.length-1]

        ultimaCompra.libros.forEach((libro:any) => {
          for(let i=0;i<libro.cantidad;i++){
            this.productosRepetidos.push(libro.titulo)
          }
        });

      }
    })

  }

}
