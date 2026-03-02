import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComprasServices } from '../../services/compras-services';

@Component({
  selector: 'app-nuevo',
  imports: [CommonModule],
  templateUrl: './nuevo.html',
  styleUrl: './nuevo.css',
})
export class Nuevo implements OnInit {
  productosRepetidos: any[] = [];

  constructor(private comprasService: ComprasServices) {}

  ngOnInit(): void {
    const user = JSON.parse(localStorage.getItem('user')!);
    const clienteId = user._id;

    this.comprasService.mostrarComprasCliente(clienteId).subscribe({
      next: (compras: any) => {
        const ultimaCompra = compras[compras.length - 1];

        ultimaCompra.libros.forEach((libro:any) => {
          for(let i=0;i<libro.cantidad;i++){
            this.productosRepetidos.push({
              titulo: libro.titulo,
              precio: libro.precio
            })
          }
        });
      }
    });
  }
}