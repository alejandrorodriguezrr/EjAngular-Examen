import { Component } from '@angular/core';
import { Carrito } from "../carrito/carrito";
import { ComprasServices } from '../../services/compras-services';
import { ClientesServices } from '../../services/clientes-services';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-latder',
  imports: [Carrito, NgFor],
  templateUrl: './latder.html',
  styleUrl: './latder.css',
})
export class Latder {

  constructor(private comprasServices: ComprasServices, private clientesServices: ClientesServices){}

  producto: number=0
  tituloMasCaro: string=""
  clientesQueCompraron:string[]=[]

  ngOnInit(){

    this.comprasServices.mostrarCompras().subscribe({
      next: (compras:any) => {
        let MaxCaro=0

        compras.forEach((compra:any) => {
          compra.libros.forEach((libro:any) => {
            if(libro.precio>MaxCaro){
              MaxCaro=libro.precio
              this.tituloMasCaro=libro.titulo
            }
          });
        });
        this.producto=MaxCaro

        compras.forEach((compra:any) => {
          compra.libros.forEach((libro:any) => {
            if(libro.titulo===this.tituloMasCaro){
              this.clientesServices.mostrarCliente(compra.clienteId._id).subscribe({
                next: (cliente:any) => {
                  let yaExiste=false

                  this.clientesQueCompraron.forEach((c:any) => {
                    if(c === cliente.nombre){
                      yaExiste=true
                    }
                  })
                  if(!yaExiste){
                    this.clientesQueCompraron.push(cliente.nombre)
                  }
                }
              })
            }
          });
        });
        
      }
    })
  }
}
