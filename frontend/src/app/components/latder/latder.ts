import { Component } from '@angular/core';
import { Carrito } from "../carrito/carrito";
import { ClientesServices } from '../../services/clientes-services';
import { ComprasServices } from '../../services/compras-services';
import { NgForOf } from "../../../../node_modules/@angular/common/types/_common_module-chunk";
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-latder',
  imports: [Carrito, NgFor],
  templateUrl: './latder.html',
  styleUrl: './latder.css',
})
export class Latder {

  constructor(private clientesServices: ClientesServices, private comprasServices:ComprasServices){}

  clientes: any[]=[]

  ngOnInit(){

    this.clientesServices.mostrarClientes().subscribe({
      next:(clientes:any) => {
        clientes.forEach((cliente:any) => {
          this.comprasServices.mostrarComprasCliente(cliente._id).subscribe({
            next:(compras:any) => {
              let categorias:string[]=[]
              compras.forEach((compra:any) => {
                compra.libros.forEach((libro:any) => {
                  console.log('generos', libro.genero)
                  if(!categorias.includes(libro.genero)){
                    categorias.push(libro.genero)
                  }
                });
              });
              this.clientes.push({
                nombre: cliente.nombre,
                numero: categorias.length
              })
            }
          })
        });
      }
    })

  }

}
