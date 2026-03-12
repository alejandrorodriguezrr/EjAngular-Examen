import { Component } from '@angular/core';
import { Head } from "../head/head";
import { Latizq } from "../latizq/latizq";
import { Medio } from "../medio/medio";
import { Latder } from "../latder/latder";
import { Footer } from "../footer/footer";
import { LibrosServices } from '../../services/libros-services';
import { ComprasServices } from '../../services/compras-services';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-main',
  imports: [Head, Latizq, Medio, Latder, Footer, NgFor],
  templateUrl: './main.html',
  styleUrl: './main.css',
})
export class Main {

  nombreProductos:string[]=[]
  repetidos:string[]=[]

  constructor(private comprasServices:ComprasServices){}

  ngOnInit(){
    this.comprasServices.mostrarCompras().subscribe({
      next: (compras:any) => {
        compras.forEach((compra:any) => {
          compra.libros.forEach((libro:any) => {
            if(this.nombreProductos.includes(libro.titulo)){
              
            }
          });
        });
      }
    })
  }

}
