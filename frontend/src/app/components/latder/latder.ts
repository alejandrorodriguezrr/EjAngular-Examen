import { Component } from '@angular/core';
import { Carrito } from "../carrito/carrito";
import { ComprasServices } from '../../services/compras-services';
import { NgForOf } from "../../../../node_modules/@angular/common/types/_common_module-chunk";
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-latder',
  imports: [Carrito, NgFor],
  templateUrl: './latder.html',
  styleUrl: './latder.css',
})
export class Latder {

  constructor(private comprasServices:ComprasServices){}
  
  veces: string[]=[]

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
        const ultimoProducto=ultimaCompra.libros[ultimaCompra.libros.length-1]
        
        for(let i=0;i<ultimoProducto.cantidad;i++){
          this.veces.push(ultimoProducto.titulo)
        }
      }
    })
  }
}
