import { Component } from '@angular/core';
import { Carrito } from "../carrito/carrito";
import { ComprasServices } from '../../services/compras-services';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-latder',
  imports: [Carrito, NgFor],
  templateUrl: './latder.html',
  styleUrl: './latder.css',
})
export class Latder {

  constructor(private comprasServices: ComprasServices){}

  ultimaCompras:any[]=[]

    ngOnInit(): void {
      this.comprasServices.mostrarCompras().subscribe({
        next: (data: any) => {
          const ultimaCompra = data[data.length - 1];

          ultimaCompra.libros.forEach((libro:any) => {
            for(let i = 0; i < libro.cantidad; i++){
              this.ultimaCompras.push(libro.titulo);
            }
          });
        }
      })
    }
  }

