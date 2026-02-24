import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-categorias',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './categorias.html',
  styleUrls: ['./categorias.css']
})
export class Categorias implements OnInit {

  categorias: string[] = [];

  @Output() categoriaSeleccionada = new EventEmitter<string>();

  private urlCategorias = 'http://localhost:5000/api/libros/generos';

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.cargarCategorias();
  }

  cargarCategorias(): void {
    this.http.get<string[]>(this.urlCategorias).subscribe({
      next: (datos) => {
        console.log('Categorias recibidas:', datos);
        this.categorias = datos ?? [];
      },
      error: (e) => console.log('Error cargando categorias', e)
    });
  }

  seleccionarCategoria(categoria: string): void {
    this.categoriaSeleccionada.emit(categoria);
  }
}
