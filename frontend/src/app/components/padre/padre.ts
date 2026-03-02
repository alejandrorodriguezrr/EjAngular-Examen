import { Component } from '@angular/core';
import { ComprasServices } from '../../services/compras-services';
import { Hijo } from '../hijo/hijo';

@Component({
  selector: 'app-padre',
  imports: [Hijo],
  templateUrl: './padre.html',
  styleUrl: './padre.css',
})
export class Padre {

  constructor(private comprasServices: ComprasServices){}

  todosProductos: any[]=[]

  recojodelhijo: number=0

  ngOnInit(){
    const userRaw = localStorage.getItem('user');
    if (!userRaw) {
      alert('Debes iniciar sesión para realizar una compra');
      return;
    }

    const cliente = JSON.parse(userRaw);
    const clienteId = cliente._id ?? cliente.id;

    if (!clienteId) {
      console.error('Usuario sin ID:', cliente);
      alert('Error: el usuario logueado no tiene ID. Revisa el login.');
      return;
    }

    this.comprasServices.mostrarComprasCliente(clienteId).subscribe({
      next: (compras:any) => {
        compras.forEach((compra: any) => {
          compra.libros.forEach((libro: any) => {

            let yaExiste=false
            
            this.todosProductos.forEach((p:any) => {
              if(p.titulo==libro.titulo){
                yaExiste=true
              }
            })

            if(!yaExiste){
              this.todosProductos.push(libro)
            }
          });
        });
      }
    })
  }

  recibirTotal(total:number){
    this.recojodelhijo=total
  }

}
