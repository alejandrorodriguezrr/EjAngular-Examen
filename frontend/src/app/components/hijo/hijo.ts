import { Component, EventEmitter, Input, Output, SimpleChange, SimpleChanges } from '@angular/core';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-hijo',
  imports: [NgFor],
  templateUrl: './hijo.html',
  styleUrl: './hijo.css',
})
export class Hijo {

  @Input() reciboHijo: any[] = []
  @Output() mandoHijo = new EventEmitter<number>()

  ngOnChanges(changes: SimpleChanges){
    this.mandoHijo.emit(this.reciboHijo.length)
  }
}
