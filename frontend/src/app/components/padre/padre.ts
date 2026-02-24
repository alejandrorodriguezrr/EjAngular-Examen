import { Component } from '@angular/core';
import { ComprasServices } from '../../services/compras-services';
import { Hijo } from "../hijo/hijo";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-padre',
  standalone:true,
  imports: [Hijo, CommonModule],
  templateUrl: './padre.html',
  styleUrl: './padre.css',
})
export class Padre {

  numeroCompras=0

  constructor(private comprasService: ComprasServices){}

  ngOnInit() : void{

    const comp = localStorage.getItem('user')

    if(!comp){
      this.numeroCompras=0
      return
    }

    const usuario = JSON.parse(comp)
    const idUsuario = String(usuario._id ?? usuario.id ?? '')

    if (!idUsuario) {
      this.numeroCompras = 0;
      return;
    }

    this.comprasService.mostrarComprasCliente(idUsuario).subscribe((compras: any) => {
      this.numeroCompras = compras.length
    })

  }

}
