import { Component, Input } from '@angular/core';
import { NgIf } from '@angular/common';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-hijo',
  imports: [CommonModule, NgIf],
  templateUrl: './hijo.html',
  styleUrl: './hijo.css',
})
export class Hijo {

  @Input() numerocompras: number=0

}
