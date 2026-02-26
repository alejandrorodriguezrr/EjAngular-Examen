import { Component } from '@angular/core';
import { Head } from "../head/head";
import { Latizq } from "../latizq/latizq";
import { Medio } from "../medio/medio";
import { Latder } from "../latder/latder";
import { Footer } from "../footer/footer";
import { ComprasServices } from '../../services/compras-services';
import { NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-main',
  imports: [Head, Latizq, Medio, Latder, Footer, NgIf, NgFor],
  templateUrl: './main.html',
  styleUrl: './main.css',
})
export class Main {

  productos: string[]=[]

  constructor(private comprasServices:ComprasServices){}

  ngOnInit(){

    const contador: { [titulo:string]: number}={}

    this.comprasServices.mostrarCompras().subscribe({
      next: (data:any) =>{
        data.forEach((compra:any) => {
          compra.libros.forEach((libro:any) => {
            if(!contador[libro.titulo]){
              contador[libro.titulo]=0
            }
            contador[libro.titulo]++
          })
        });

        this.productos = Object.keys(contador).filter(
          titulo=>contador[titulo]>=2
        )
      } 
    })
  }

}
