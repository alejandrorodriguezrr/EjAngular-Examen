import { Component } from '@angular/core';
import { ComprasServices } from '../../services/compras-services';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Hijo } from '../hijo/hijo';

@Component({
  selector: 'app-padre',
  imports: [CommonModule,FormsModule,Hijo],
  templateUrl: './padre.html',
  styleUrl: './padre.css',
})
export class Padre {

  nombreProducto: string=""
  totalCantidad: number=0

  constructor(private comprasService: ComprasServices){}

  buscar(): void {
    this.comprasService.mostrarCompras().subscribe({
      next: (data: any) =>{
        let total=0

        data.foreach((compra: any) =>{
          compra.libros.foreach((libro: any) => {
            if(libro.titulo.toLowerCase().includes(this.nombreProducto)){
              total+=libro.totalCantidad
            }
          })    
        })
        this.totalCantidad=total
      }
    })
  }
}
  

