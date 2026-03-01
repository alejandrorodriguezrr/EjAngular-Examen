import { Component } from '@angular/core';
import { Carrito } from "../carrito/carrito";
import { Nuevo } from "../nuevo/nuevo";

@Component({
  selector: 'app-latder',
  imports: [Carrito, Nuevo],
  templateUrl: './latder.html',
  styleUrl: './latder.css',
})
export class Latder {

}
