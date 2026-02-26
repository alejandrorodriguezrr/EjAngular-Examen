import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComprasServices } from '../../services/compras-services';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-nuevo',
  imports: [CommonModule, FormsModule],
  templateUrl: './nuevo.html',
  styleUrl: './nuevo.css',
})
export class Nuevo implements OnInit {
  clienteConMasCompras: string = '';
  totalEnEuros: number = 0;

  constructor(public comprasService: ComprasServices) {}

  ngOnInit(): void {
    this.comprasService.mostrarCompras().subscribe({
      next: (data: any) => {
        const resumen: { [clienteId: string]: { compras: number, total: number } } = {};

        data.forEach((compra: any) => {
          if (!resumen[compra.clienteId]) {
            resumen[compra.clienteId] = { compras: 0, total: 0 };
          }
          resumen[compra.clienteId].compras++;
          resumen[compra.clienteId].total += compra.total;
        });

        // Sacamos el cliente con más compras
        const topId = Object.keys(resumen).reduce((a, b) =>
          resumen[a].compras > resumen[b].compras ? a : b
        );

        this.clienteConMasCompras = topId;
        this.totalEnEuros = resumen[topId].total;
      }
    });
  }
}