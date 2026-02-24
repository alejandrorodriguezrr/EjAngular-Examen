import { Component } from '@angular/core';
import { ComprasServices } from '../../services/compras-services';

@Component({
  standalone:true,
  selector: 'app-new',
  imports: [],
  templateUrl: './new.html',
  styleUrl: './new.css',
})
export class New {

  mensaje: string = ""

  constructor(private comprasServices: ComprasServices){}

  ngOnInit(): void{
    const textoUsuario = localStorage.getItem('user');
    if (!textoUsuario) { 
      this.mensaje = 'Bienvenido';
      return;
    }
    const usuario = JSON.parse(textoUsuario);
    const idCliente = String(usuario._id ?? usuario.id ?? '');

    this.comprasServices.mostrarComprasCliente(idCliente).subscribe({
        next: (compras: any) => { 
        if (compras && compras.length > 0) {
          this.mensaje = 'Usted no es la primera vez que compra';
        } else {
          this.mensaje = 'Bienvenido';
        }
      }
    });
  }

}
