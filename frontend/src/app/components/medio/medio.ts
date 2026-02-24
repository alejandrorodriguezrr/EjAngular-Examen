import { Component, OnInit } from '@angular/core';
import { MedioCard } from '../medio-card/medio-card';
import { CommonModule } from '@angular/common';
import { LibroModel } from '../../models/libro-model';
import { LibrosServices } from '../../services/libros-services';
import { ActivatedRoute } from '@angular/router'; 

@Component({
  selector: 'app-medio',
  standalone: true,
  imports: [MedioCard, CommonModule],
  templateUrl: './medio.html',
  styleUrls: ['./medio.css']
})
export class Medio implements OnInit {

  productos: LibroModel[] = [];             
  productosOriginales: LibroModel[] = [];   
  generoActual = '';                        

  constructor(
    private librosService: LibrosServices,
    private ruta: ActivatedRoute            
  ) {}

  ngOnInit(): void {
    this.ruta.queryParamMap.subscribe(params => {
      this.generoActual = params.get('genero') ?? '';
      this.aplicarFiltro(); 
    });

    this.cargarLibros();
  }

  cargarLibros(): void {
    this.librosService.mostrarLibros().subscribe({
      next: (data: any) => {
        this.productosOriginales = data ?? [];
        this.aplicarFiltro(); 
      },
      error: (error) => {
        console.error('Error al cargar los libros:', error);
      }
    });
  }

  aplicarFiltro(): void {
    const genero = this.generoActual.trim().toLowerCase();

    if (!genero) {
      this.productos = [...this.productosOriginales];
      return;
    }

    this.productos = this.productosOriginales.filter((libro: any) =>
      ((libro.genero ?? '').trim().toLowerCase() === genero)
    );
  }
}
