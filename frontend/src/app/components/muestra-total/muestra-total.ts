import { Component } from '@angular/core';
import { ComprasServices } from '../../services/compras-services';

@Component({
  selector: 'app-muestra-total',
  imports: [],
  templateUrl: './muestra-total.html',
  styleUrl: './muestra-total.css',
})
export class MuestraTotal {

  totalProductos: number = 0
  clienteId: string=""

  constructor(private comprasServices: ComprasServices){}

  ngOnInit(){
    this.obtenerClienteId();
        
  }

  obtenerClienteId() {
    const userData = localStorage.getItem('user');
    if (userData) {
      const user = JSON.parse(userData);  
      this.clienteId = user._id;
    }
  }
}
