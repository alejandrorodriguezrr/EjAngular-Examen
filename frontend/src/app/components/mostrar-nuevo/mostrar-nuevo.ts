import { Component } from '@angular/core';
import { CarritoService, ItemCarrito } from '../../services/carrito-services';
import { NgIf, NgFor } from '@angular/common';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-mostrar-nuevo',
  imports: [NgIf, NgFor, CommonModule],
  templateUrl: './mostrar-nuevo.html',
  styleUrl: './mostrar-nuevo.css',
})
export class MostrarNuevo {

   carrito: ItemCarrito[] = [];
    total: number = 0;
  
    constructor(
      private carritoService: CarritoService,
    ) {}

  ngOnInit(): void {
    this.carritoService.carrito$.subscribe(items => {
      this.carrito = items;
    });
  }

  repetir(n: number): any[] {
    return Array(n);
  }

}
