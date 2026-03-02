import { Component } from '@angular/core';
import { ComprasServices } from '../../services/compras-services';

@Component({
  selector: 'app-nuevo',
  imports: [],
  templateUrl: './nuevo.html',
  styleUrl: './nuevo.css',
})
export class Nuevo {

  constructor(private comprasServices: ComprasServices){}

  primerProducto: any=null
  ultimoProducto: any=null

  ngOnInit(){

    this.comprasServices.mostrarCompras().subscribe({
      next: (compras:any) => {
        this.primerProducto=compras[0].libros[0]

        const ultimoPedido=compras[compras.length-1]
        this.ultimoProducto=ultimoPedido.libros[ultimoPedido.libros.length-1]
        
      }
    })
  }
}
