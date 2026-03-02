import { Component } from '@angular/core';
import { Carrito } from "../carrito/carrito";
import { Padre } from '../padre/padre';

@Component({
  selector: 'app-latder',
  imports: [Carrito,Padre],
  templateUrl: './latder.html',
  styleUrl: './latder.css',
})
export class Latder {

}
