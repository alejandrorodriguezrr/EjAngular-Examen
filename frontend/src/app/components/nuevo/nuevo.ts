import { Component } from '@angular/core';
import { ComprasServices } from '../../services/compras-services';

@Component({
  selector: 'app-nuevo',
  imports: [],
  templateUrl: './nuevo.html',
  styleUrl: './nuevo.css',
})
export class Nuevo {

  constructor(private comprasservices:ComprasServices){}

  nombreCliente: string=""
  totalEuros: number=0

  ngOnInit(){
    this.clientemasCompras()
  }

  clientemasCompras(){

    this.comprasservices.mostrarCompras().subscribe({
      next: (compras:any) => {
        let maxcantidad=0

        compras.forEach((compra:any) => {
          let cantidadCompra=0
          compra.libros.forEach((libro: any)=> {
            cantidadCompra+=libro.cantidad
          });

          if(cantidadCompra>maxcantidad){
            maxcantidad=cantidadCompra
            this.nombreCliente=compra.clienteId.nombre
            console.log("nombre", this.nombreCliente)
            this.totalEuros=compra.total
            console.log("total", this.totalEuros)

          }
        });

      }
    })

  }

}
