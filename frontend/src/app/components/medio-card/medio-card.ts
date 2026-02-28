import { Component, Input } from '@angular/core';
import { LibroModel } from '../../models/libro-model';
import { CarritoService } from '../../services/carrito-services';

@Component({
  selector: 'app-medio-card',
  standalone: true,
  templateUrl: './medio-card.html',
  styleUrls: ['./medio-card.css']
})
export class MedioCard {

  @Input() libro!: LibroModel;

  constructor(private carritoService: CarritoService) {}

  agregarAlCarrito(): void {
    const carrito = this.carritoService.obtenerCarrito();
    let total=0

    for(let i=0;i<carrito.length;i++){
      total+=carrito[i].cantidad
    }

    if(total>=6){
      alert("No puedes añadir mas unidades")
      return
    }

    this.carritoService.agregarAlCarrito(this.libro)
    
  }
}