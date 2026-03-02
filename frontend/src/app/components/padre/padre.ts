import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Hijo } from '../hijo/hijo';
import { LibrosServices } from '../../services/libros-services';

@Component({
  selector: 'app-padre',
  imports: [CommonModule, Hijo],
  templateUrl: './padre.html',
  styleUrl: './padre.css',
})
export class Padre implements OnInit {
  libroSeleccionado: any = null;

  constructor(public librosService: LibrosServices) {}

  ngOnInit(): void {
    this.librosService.mostrarLibros().subscribe({
      next: (data: any) => {
        this.librosService.libros = data;
      }
    });
  }

  editar(libro: any): void {
    this.libroSeleccionado = libro;
  }
}