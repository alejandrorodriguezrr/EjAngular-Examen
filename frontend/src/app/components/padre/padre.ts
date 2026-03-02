import { Component } from '@angular/core';
import { ComprasServices } from '../../services/compras-services';
import { Hijo } from '../hijo/hijo';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-padre',
  imports: [Hijo],
  templateUrl: './padre.html',
  styleUrl: './padre.css',
})
export class Padre {

  constructor(private comprasService: ComprasServices){}

  masdeUna: string[] = []

  mostrarHijo: number=0

  ngOnInit(){

  }

  cargar(){
    this.comprasService.mostrarCompras().subscribe({
      next: (compras:any) => {
        compras.forEach((compra:any) => {
          compra.libros.forEach((libro:any) => {
            if(libro.titulo.length>1){
              this.masdeUna.push(libro.titulo)
            }
          })
        });
      }
    })
  }

  recibirTotal(total:number){
    this.mostrarHijo=total
  }
}
