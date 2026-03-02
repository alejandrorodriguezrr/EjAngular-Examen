import { CommonModule, NgIf } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-hijo',
  imports: [NgIf, CommonModule],
  templateUrl: './hijo.html',
  styleUrl: './hijo.css',
})
export class Hijo {

  @Input() libro: any=null
}
