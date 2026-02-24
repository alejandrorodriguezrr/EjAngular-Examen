import { Component } from '@angular/core';
import { Carrito } from "../carrito/carrito";
import { New } from "../new/new";

@Component({
  selector: 'app-latder',
  imports: [Carrito, New],
  templateUrl: './latder.html',
  styleUrl: './latder.css',
})
export class Latder {

}
