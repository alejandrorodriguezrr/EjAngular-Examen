import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { CommonModule, NgFor, NgForOf } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { ComprasServices } from '../../services/compras-services';
import { ClientesServices } from '../../services/clientes-services';

@Component({
  selector: 'app-categorias',
  standalone: true,
  imports: [CommonModule, NgFor],
  templateUrl: './categorias.html',
  styleUrls: ['./categorias.css']
})
export class Categorias implements OnInit {

  categorias: string[] = [];
  clientesPrimeraCategoria: string[]=[]

  @Output() categoriaSeleccionada = new EventEmitter<string>();

  private urlCategorias = 'http://localhost:5050/api/libros/generos';

  constructor(private http: HttpClient, private comprasServices: ComprasServices, private clientesServices: ClientesServices) {}

  ngOnInit(): void {
    this.cargarCategorias();
    this.clientesqueCompraron()
  }

  clientesqueCompraron(): void{
    this.http.get<string[]>(this.urlCategorias).subscribe({
      next: (categoriass:any) => {
        const primera=categoriass[0]

        this.comprasServices.mostrarCompras().subscribe({
          next: (compras:any) => {
            compras.forEach((compra:any) => {
              compra.libros.forEach((libro:any) => {
                console.log('libro.genero:', libro.generos, 'primeraCategoria:', primera);
                if(libro.genero===primera){
                  console.log("libro encontrado",libro.titulo)
                  this.clientesServices.mostrarCliente(compra.clienteId._id).subscribe({
                    next: (cliente:any) => {
                      console.log("cliente encontrado", cliente)
                      let yaexiste=false
                      this.clientesPrimeraCategoria.forEach((c:any) => {
                        if(c===cliente.nombre){
                          yaexiste=true
                        }
                      })
                      if(!yaexiste){
                        this.clientesPrimeraCategoria.push(cliente.nombre)
                      }
                    }
                  })
                }
              });
            });
          }
        })
      }
    })

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
