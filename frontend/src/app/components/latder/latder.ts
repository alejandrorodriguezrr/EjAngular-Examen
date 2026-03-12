import { Component } from '@angular/core';
import { Carrito } from "../carrito/carrito";
import { ComprasModel } from '../../models/compras-model';
import { ComprasServices } from '../../services/compras-services';

@Component({
  selector: 'app-latder',
  imports: [Carrito],
  templateUrl: './latder.html',
  styleUrl: './latder.css',
})
export class Latder {

}
