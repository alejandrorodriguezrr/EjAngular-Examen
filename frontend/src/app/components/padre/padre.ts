import { Component } from '@angular/core';
import { CarritoService } from '../../services/carrito-services';
import { LibrosServices } from '../../services/libros-services';
import { Hijo } from "../hijo/hijo";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-padre',
  imports: [Hijo, CommonModule],
  templateUrl: './padre.html',
  styleUrl: './padre.css',
})
export class Padre {

  cantidadCarrito: number = 0;
  totalUnidades: number = 0

  constructor(private carritoService:CarritoService,
    private librosServices: LibrosServices
  ){}


  ngOnInit(): void {
    this.carritoService.carrito$.subscribe(items => {
      this.cantidadCarrito = items.length;
      this.totalUnidades = items.reduce((total, item) => total + item.cantidad, 0);
    });
  }

}
