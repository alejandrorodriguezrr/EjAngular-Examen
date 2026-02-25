import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-hijo',
  imports: [CommonModule],
  templateUrl: './hijo.html',
  styleUrl: './hijo.css',
})
export class Hijo {

  @Input() compras:any[]=[]
  @Input() numeroCompras:number=0

}
