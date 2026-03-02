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
  productosFiltrados: any[] = []

  @Output() categoriaSeleccionada = new EventEmitter<string>();

  private urlCategorias = 'http://localhost:5050/api/libros/generos';

  constructor(private http: HttpClient, private comprasService:ComprasServices) {}

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

  mostrarSoloComprados(categoria: string){

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
      next: (compras:any) => {
        
        compras.forEach((compra:any) => {
          compra.libros.forEach((libro:any) => {
            if(libro.genero===categoria){
              this.productosFiltrados.push(libro)
            }
          });
        });
      }
    })
  }
}
