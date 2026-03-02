import { Component } from '@angular/core';
import { Head } from "../head/head";
import { Latizq } from "../latizq/latizq";
import { Medio } from "../medio/medio";
import { Latder } from "../latder/latder";
import { Footer } from "../footer/footer";
import { ComprasServices } from '../../services/compras-services';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-main',
  imports: [Head, Latizq, Medio, Latder, Footer, NgFor],
  templateUrl: './main.html',
  styleUrl: './main.css',
})
export class Main {

  constructor(private comprasService: ComprasServices){}

  nombreProductos: string[]=[]

  ngOnInit(){
    this.comprasService.mostrarCompras().subscribe({
      next: (compras:any) => {
        const comtador: any = {}

        compras.forEach((compra:any) => {
          const titulosEnEstePedido: string[] = []
          compra.libros.forEach((libro:any) => {
            if(!titulosEnEstePedido.includes(libro.titulo)){
              titulosEnEstePedido.push(libro.titulo)
            }
          });
          titulosEnEstePedido.forEach((titulo:string) => {
            contador[titulo]=(contador[titulo]+1)
          })
        });

        this.nombreProductos = [];
        for (const titulo in contador) {
          if (contador[titulo] >= 2) {
            this.nombreProductos.push(titulo);
          }
        }
      }
    })
  }
}
