import { NgFor } from '@angular/common';
import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-hijo',
  imports: [NgFor],
  templateUrl: './hijo.html',
  styleUrl: './hijo.css',
})
export class Hijo {

  @Input() recojoPadre: string[] = [];
  @Output() mandarPadre = new EventEmitter<number>();

  ngOnChanges(changes: SimpleChanges){
    if (changes['recojoPadre']) {
      this.mandarPadre.emit(this.recojoPadre.length);
    }
  }
}