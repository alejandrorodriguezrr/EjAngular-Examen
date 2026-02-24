import { Component } from '@angular/core';
import { Carrito } from "../carrito/carrito";
import { MostrarNuevo } from "../mostrar-nuevo/mostrar-nuevo";

@Component({
  selector: 'app-latder',
  imports: [Carrito, MostrarNuevo],
  templateUrl: './latder.html',
  styleUrl: './latder.css',
})
export class Latder {

}
