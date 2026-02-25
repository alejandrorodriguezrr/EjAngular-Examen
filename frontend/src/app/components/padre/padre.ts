import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { LibrosServices } from '../../services/libros-services';
import { ComprasServices } from '../../services/compras-services';
import { ClientesServices } from '../../services/clientes-services';

@Component({
  selector: 'app-padre',
  imports: [FormsModule],
  templateUrl: './padre.html',
  styleUrl: './padre.css',
})
export class Padre {

  nombreProducto: string=""
  clientes: string[]=[]

  constructor(private comprasService: ComprasServices,
    private clientesService:ClientesServices){}

  buscarProducto(): void{
    this.comprasService.mostrarCompras().subscribe({
      next: (data: any) => {

      }
    })
  }

}
