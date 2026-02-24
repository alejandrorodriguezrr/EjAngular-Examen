import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CarritoService, ItemCarrito } from '../../services/carrito-services';
import { ComprasServices } from '../../services/compras-services';
import { ComprasModel } from '../../models/compras-model';

@Component({
  selector: 'app-carrito',
  imports: [CommonModule, FormsModule],
  templateUrl: './carrito.html',
  styleUrl: './carrito.css',
})
export class Carrito implements OnInit {

  carrito: ItemCarrito[] = [];
  total: number = 0;

  constructor(
    private carritoService: CarritoService,
    private comprasService: ComprasServices
  ) {}

  ngOnInit(): void {
    this.carritoService.carrito$.subscribe(items => {
      this.carrito = items;
      this.total = this.carritoService.calcularTotal();
    });
  }

  eliminarItem(libroId: string): void {
    this.carritoService.eliminarDelCarrito(libroId);
  }

  realizarCompra(): void {
    if (this.carrito.length === 0) {
      alert('El carrito está vacío');
      return;
    }

    const userRaw = localStorage.getItem('user');
    if (!userRaw) {
      alert('Debes iniciar sesión para realizar una compra');
      return;
    }

    const cliente = JSON.parse(userRaw);
    const clienteId = cliente._id ?? cliente.id;

    if (!clienteId) {
      console.error('Usuario sin ID:', cliente);
      alert('Error: el usuario logueado no tiene ID. Revisa el login.');
      return;
    }

    this.comprasService.mostrarComprasCliente(clienteId).subscribe({
      next: (comprasPrevias: any) => {

        const librosyaComprados: String[] = []

        comprasPrevias.forEach((compra: any) => {
          compra.libros.forEach((libro: any) => {
            librosyaComprados.push(libro.libroId)
          })
        })
        const carritofiltrado = this.carrito.filter(
          item=> !librosyaComprados.includes(item.libro._id)
        )
      }
    })

    const cantidades: { [key: string]: number } = {};
    this.carrito.forEach(item => {
      cantidades[item.libro._id] = item.cantidad;
    });

    const compra = {
      clienteId: clienteId,
      libros: this.carrito.map(item => ({
        libroId: item.libro._id,
        titulo: item.libro.titulo,
        autor: item.libro.autor,
        precio: item.libro.precio,
        cantidad: item.cantidad,
        imagen: item.libro.imagen
      })),
      fecha: new Date(),
      total: this.total
    };


    this.comprasService.crearCompra(compra).subscribe({
      next: () => {
        alert('Compra realizada con éxito');
        this.carritoService.vaciarCarrito(); 
      },
      error: (err) => {
        console.error('Error al realizar la compra:', err);
        const msg = err?.error?.message ?? 'Error al realizar la compra';
        alert(msg);
      }
    });
  }
}