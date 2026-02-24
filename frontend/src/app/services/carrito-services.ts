import { Injectable } from '@angular/core';
import { LibroModel } from '../models/libro-model';
import { BehaviorSubject } from 'rxjs';

export interface ItemCarrito {
  libro: LibroModel;
  cantidad: number;
}

@Injectable({
  providedIn: 'root'
})
export class CarritoService {
  private carritoItems: ItemCarrito[] = [];
  private carritoSubject = new BehaviorSubject<ItemCarrito[]>([]);
  
  carrito$ = this.carritoSubject.asObservable();

  constructor() {}

  agregarAlCarrito(libro: LibroModel): boolean {
    if (libro.stock <= 0) {
      alert('No hay stock disponible para este libro');
      return false;
    }

    const itemExistente = this.carritoItems.find(item => item.libro._id === libro._id);

    if (itemExistente) {
      if (itemExistente.cantidad >= libro.stock) {
        alert('No hay más stock disponible para este libro');
        return false;
      }
      itemExistente.cantidad++;
    } else {
      this.carritoItems.push({
        libro: libro,
        cantidad: 1
      });
    }

    this.carritoSubject.next([...this.carritoItems]);
    return true;
  }

  obtenerCarrito(): ItemCarrito[] {
    return this.carritoItems;
  }

  eliminarDelCarrito(libroId: string): void {
    this.carritoItems = this.carritoItems.filter(item => item.libro._id !== libroId);
    this.carritoSubject.next([...this.carritoItems]);
  }

  vaciarCarrito(): void {
    this.carritoItems = [];
    this.carritoSubject.next([]);
  }

  calcularTotal(): number {
    return this.carritoItems.reduce((total, item) => {
      return total + (item.libro.precio * item.cantidad);
    }, 0);
  }
}