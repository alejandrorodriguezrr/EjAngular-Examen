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
    const agregado = this.carritoService.agregarAlCarrito(this.libro);
    
  }
}