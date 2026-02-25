import { Component } from '@angular/core';
import { Carrito } from "../carrito/carrito";
import { Hijo } from '../hijo/hijo';
import { Padre } from '../padre/padre';

@Component({
  selector: 'app-latder',
  imports: [Carrito, Padre, Hijo],
  templateUrl: './latder.html',
  styleUrl: './latder.css',
})
export class Latder {

}
