import { Component } from '@angular/core';
import { CarritoService } from '../../services/carrito-services';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-nuevo',
  imports: [NgFor],
  templateUrl: './nuevo.html',
  styleUrl: './nuevo.css',
})
export class Nuevo {

  constructor(private carritoServices: CarritoService){}

  productos:string[]=[]

  ngOnInit(){
    this.carritoServices.carrito$.subscribe({
      next: (carrito:any) =>{
        this.productos=[]
        carrito.forEach((producto:any) => {
          for(let i=0; i<producto.cantidad;i++){
            this.productos.push(producto.libro.titulo)
          }
        });
      }
    })
  }
}
