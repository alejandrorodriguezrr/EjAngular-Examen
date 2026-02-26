import { Component, Input } from '@angular/core';
import { LibroModel } from '../../models/libro-model';
import { CarritoService } from '../../services/carrito-services';
import { LibrosServices } from '../../services/libros-services';

@Component({
  selector: 'app-medio-card',
  standalone: true,
  templateUrl: './medio-card.html',
  styleUrls: ['./medio-card.css']
})
export class MedioCard {

  @Input() libro!: LibroModel;

  constructor(private carritoService: CarritoService,
    private libroService:LibrosServices
  ) {}

  agregarAlCarrito(): void {
  this.carritoService.agregarAlCarrito(this.libro);

  this.libroService.borrarLibro(this.libro._id).subscribe({
    next: () => {
      this.libroService.mostrarLibros().subscribe((data: any) => {
        this.libroService.libros = data;
        window.location.reload();
      });
    }
  });
}
}