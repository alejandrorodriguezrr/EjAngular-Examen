import { Component } from '@angular/core';
import { ComprasServices } from '../../services/compras-services';
import { Hijo } from "../hijo/hijo";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-padre',
  imports: [Hijo,CommonModule],
  templateUrl: './padre.html',
  styleUrl: './padre.css',
})
export class Padre {

  productosTotales: number=0
  palabra: string = ""

  constructor(private comprasServices: ComprasServices){}

  ngOnInit(): void{
    this.calcular()
  }

  calcular(): void{
    this.comprasServices.mostrarCompras().subscribe({
      next: (data:any) => {
        data.forEach((compras:any) => {
          compras.libros.forEach((libro:any) =>{
            this.productosTotales+=libro.cantidad
          })
        });
      }
    })
  }
}
