import { NgFor } from '@angular/common';
import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import { ComprasServices } from '../../services/compras-services';

@Component({
  selector: 'app-hijo',
  imports: [NgFor],
  templateUrl: './hijo.html',
  styleUrl: './hijo.css',
})
export class Hijo {

  @Input() recogePadre: string[] = []
  @Output() mandarPadre = new EventEmitter<number>()

  ngOnChanges(changes: SimpleChanges){
    if(!changes["recogePadre"]){
      this.mandarPadre.emit(this.recogePadre.length);
    }
  }
}
