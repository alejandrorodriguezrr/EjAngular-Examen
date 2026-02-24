import { Component } from '@angular/core';
import { Carrito } from '../carrito/carrito';
import { CommonModule } from '@angular/common';
import { CarritoService, ItemCarrito } from '../../services/carrito-services';

@Component({
  selector: 'app-nuevo',
  imports: [CommonModule],
  templateUrl: './nuevo.html',
  styleUrl: './nuevo.css',
})
export class Nuevo {

  carrito: ItemCarrito[]=[]
  total: number=0

  constructor(private carritoService: CarritoService){}

  ngOnInit(): void {
    this.carritoService.carrito$.subscribe(items => {
      this.carrito = items;
    });
  }

}
