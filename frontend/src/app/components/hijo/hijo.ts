import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CarritoService } from '../../services/carrito-services';

@Component({
  selector: 'app-hijo',
  imports: [],
  templateUrl: './hijo.html',
  styleUrl: './hijo.css',
})
export class Hijo {

  @Input() delpadre: number=0
  @Output() totalCarrito = new EventEmitter<number>()

  constructor(private carritoService: CarritoService){}

  ngOnInit(){
    this.carritoService.carrito$.subscribe(items => {
      this.totalCarrito.emit(items.reduce((total, item) => total + item.cantidad, 0));
    });
  }
}
