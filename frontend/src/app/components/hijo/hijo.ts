import { Component, Input } from '@angular/core';
import { LibroModel } from '../../models/libro-model';

@Component({
  selector: 'app-hijo',
  imports: [],
  templateUrl: './hijo.html',
  styleUrl: './hijo.css',
})
export class Hijo {

  @Input() enviarClientes: LibroModel | undefined
  
}
