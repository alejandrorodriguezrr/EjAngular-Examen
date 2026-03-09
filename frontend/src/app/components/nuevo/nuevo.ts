import { Component } from '@angular/core';
import { ComprasServices } from '../../services/compras-services';

@Component({
  selector: 'app-nuevo',
  imports: [],
  templateUrl: './nuevo.html',
  styleUrl: './nuevo.css',
})
export class Nuevo {

  primerProducto: string=""
  ultimoProducto: string=""

  constructor(private comprasServices: ComprasServices){}

  ngOnInit(){
    this.comprasServices.mostrarCompras().subscribe({
      next: (compras:any) => {
        this.primerProducto=compras[0].libros[0].titulo
        let ultimaCompra=compras[compras.length-1]
        this.ultimoProducto=ultimaCompra.libros[ultimaCompra.libros.length-1].titulo
      }
    })
  }

}
