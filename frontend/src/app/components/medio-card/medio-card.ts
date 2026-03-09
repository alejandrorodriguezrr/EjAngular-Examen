import { Component, Input } from '@angular/core';
import { LibroModel } from '../../models/libro-model';
import { CarritoService } from '../../services/carrito-services';
import { ComprasServices } from '../../services/compras-services';

@Component({
  selector: 'app-medio-card',
  standalone: true,
  templateUrl: './medio-card.html',
  styleUrls: ['./medio-card.css']
})
export class MedioCard {

  @Input() libro!: LibroModel;

  total: number = 0;
  
  constructor(
    private carritoService: CarritoService, private comprasService:ComprasServices
  ) {}

  

  agregarAlCarrito(): void {
  const agregado = this.carritoService.agregarAlCarrito(this.libro);
  if(!agregado){
    const userRaw = localStorage.getItem('user');
    if(!userRaw) return;

    const cliente = JSON.parse(userRaw);
    const clienteId = cliente._id ?? cliente.id;
    const carrito = this.carritoService.obtenerCarrito();

    const compra = {
      clienteId: clienteId,
      libros: carrito.map(item => ({
        libroId: item.libro._id,
        titulo: item.libro.titulo,
        autor: item.libro.autor,
        precio: item.libro.precio,
        cantidad: item.cantidad,
        imagen: item.libro.imagen
      })),
      fecha: new Date(),
      total: this.carritoService.calcularTotal()
    };

    this.comprasService.crearCompra(compra).subscribe({
      next: () => {
        alert('Compra realizada automáticamente');
        this.carritoService.vaciarCarrito();
      }
    });
  }
}
}