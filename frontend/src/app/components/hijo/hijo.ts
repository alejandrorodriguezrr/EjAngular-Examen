import { Component, Input } from '@angular/core';
import { LibroModel } from '../../models/libro-model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-hijo',
  imports: [CommonModule],
  templateUrl: './hijo.html',
  styleUrl: './hijo.css',
})
export class Hijo {

  @Input() enviarHijo: LibroModel|null=null;


}
