import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { ComprasServices } from '../../services/compras-services';

@Component({
  selector: 'app-categorias',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './categorias.html',
  styleUrls: ['./categorias.css']
})
export class Categorias implements OnInit {

  categorias: string[] = [];
  clienteId: string=""
  productosfiltrados: any[] = []

  @Output() categoriaSeleccionada = new EventEmitter<string>();

  private urlCategorias = 'http://localhost:5050/api/libros/generos';

  constructor(private http: HttpClient, private comprasService: ComprasServices) {}

  ngOnInit(): void {
    this.cargarCategorias();

    const user = JSON.parse(localStorage.getItem('user')!)
    this.clienteId=user._id
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

    this.comprasService.mostrarComprasCliente(this.clienteId).subscribe({
      next: (compras: any) => {
        this.productosfiltrados = []

        compras.forEach((compra: any) => {
          compra.libros.forEach((libro: any) =>{
            if(libro.generos === categoria){
              this.productosfiltrados.push(libro)
            }
          })
        });
      }
    })
  }
}
