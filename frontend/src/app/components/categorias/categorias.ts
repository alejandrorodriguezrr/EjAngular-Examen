import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { ComprasServices } from '../../services/compras-services';
import { ClientesServices } from '../../services/clientes-services';

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

  private urlCategorias = 'http://localhost:5050/api/libros/generos';

  constructor(private http: HttpClient, private comprasService:ComprasServices, private clientesServices: ClientesServices) {}

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

  clientesPrimeraCategoria: any[] = []

  mostrarNombres(){

    this.http.get<string[]>(this.urlCategorias).subscribe({
      next: (datos: any) => {
        const primeraCategoria=this.categorias[0]

        this.comprasService.mostrarCompras().subscribe({
          next: (compras:any) => {
            const idsClientes: string[] = []
            compras.forEach((compra:any) => {
              compra.libros.forEach((libro: any) => {
                if(libro.genero==primeraCategoria){
                  idsClientes.push(compra.clienteId)
                }
              });
            });

            idsClientes.forEach((id:string) => {
              this.clientesServices.mostrarCliente(id).subscribe({
                next: (cliente:any) => {
                  this.clientesPrimeraCategoria.push(cliente.nombre)
                }
              })
            })
          }
        })
      }
    })
  }

  seleccionarCategoria(categoria: string): void {
    this.categoriaSeleccionada.emit(categoria);
  }
}
