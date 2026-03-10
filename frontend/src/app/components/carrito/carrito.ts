import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CarritoService, ItemCarrito } from '../../services/carrito-services';
import { ComprasServices } from '../../services/compras-services';

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

  productos:string[]=[]

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
  if (!userRaw) return;

  const cliente = JSON.parse(userRaw);
  const clienteId = cliente._id ?? cliente.id;

  this.comprasService.mostrarComprasCliente(clienteId).subscribe({
    next: (comprasPrevias: any) => {

      // Sacamos los títulos ya comprados
      const titulosYaComprados: string[] = [];
      comprasPrevias.forEach((compra: any) => {
        compra.libros.forEach((libro: any) => {
          titulosYaComprados.push(libro.titulo);
        });
      });

      // Solo añadimos los que no ha comprado antes
      const librosFiltrados: any[] = [];
      this.carrito.forEach(item => {
        if(!titulosYaComprados.includes(item.libro.titulo)){
          librosFiltrados.push({
            libroId: item.libro._id,
            titulo: item.libro.titulo,
            autor: item.libro.autor,
            precio: item.libro.precio,
            cantidad: item.cantidad,
            imagen: item.libro.imagen,
            genero: item.libro.genero
          });
        }
      });

      if(librosFiltrados.length === 0){
        alert('Ya has comprado todos estos productos antes');
        return;
      }

      const compra = {
        clienteId: clienteId,
        libros: librosFiltrados,
        fecha: new Date(),
        total: this.total
      };

      this.comprasService.crearCompra(compra).subscribe({
        next: () => {
          alert('Compra realizada con éxito');
          this.carritoService.vaciarCarrito();
        },
        error: (err) => {
          const msg = err?.error?.message ?? 'Error al realizar la compra';
          alert(msg);
        }
      });
    }
  });
}
}