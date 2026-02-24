import { Component, EventEmitter, Output } from '@angular/core';
import { Categorias } from "../categorias/categorias";

@Component({
  selector: 'app-latizq',
  standalone: true,
  imports: [Categorias],
  templateUrl: './latizq.html',
  styleUrl: './latizq.css',
})
export class Latizq {
    @Output() categoriaSeleccionada = new EventEmitter<string>();

  categoriaActual = '';
libros: any[] = [];
librosFiltrados: any[] = [];

filtrarPorCategoria(categoria: string): void {
  this.categoriaActual = categoria;

  if (!categoria) {
    this.librosFiltrados = [...this.libros];
    return;
  }

  const categoriaNormalizada = categoria.trim().toLowerCase();

  this.librosFiltrados = this.libros.filter(libro =>
    (libro.genero ?? '').trim().toLowerCase() === categoriaNormalizada
  );
}

reenviarCategoria(categoria: string): void {
    this.categoriaSeleccionada.emit(categoria);
  }

}
