import { CommonModule, NgFor } from '@angular/common';
import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-hijo',
  imports: [NgFor, CommonModule],
  templateUrl: './hijo.html',
  styleUrl: './hijo.css',
})
export class Hijo {

  @Input() recogePadre: any[]=[]
  @Output() enviaPadre = new EventEmitter<number>()

  ngOnChanges(changes: SimpleChanges){
  console.log('changes:', changes); // <-- añade esto
  console.log('recogePadre:', this.recogePadre); 
    if(changes['recogePadre']){
      this.enviaPadre.emit(this.recogePadre.length)
    }
  }
}
