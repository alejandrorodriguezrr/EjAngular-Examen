import { Component } from '@angular/core';
import { CarritoService, ItemCarrito } from '../../services/carrito-services';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-nuevo',
  imports: [NgFor],
  templateUrl: './nuevo.html',
  styleUrl: './nuevo.css',
})
export class Nuevo {

  constructor(private carritoServices: CarritoService){}

  carrito: ItemCarrito[]=[]

  ngOnInit(){
    this.carritoServices.carrito$.subscribe(items =>{
      this.carrito=items
    })
  }

}
