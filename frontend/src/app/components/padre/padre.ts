import { Component } from '@angular/core';
import { ComprasServices } from '../../services/compras-services';
import { Hijo } from "../hijo/hijo";

@Component({
  selector: 'app-padre',
  imports: [Hijo],
  templateUrl: './padre.html',
  styleUrl: './padre.css',
})
export class Padre {

  constructor(private comprasService: ComprasServices){}

  envioHijo:number=0
  reciboHijo:String=""

  ngOnInit(){
    this.comprasService.mostrarCompras().subscribe({
      next: (compras:any) => {
        compras.forEach((compra:any) => {
          compra.libros.forEach((libro:any) => {
            this.envioHijo+=libro.cantidad
          });
        });
      }
    })
  }

}
