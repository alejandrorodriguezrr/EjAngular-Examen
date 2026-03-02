import { Component, EventEmitter, Input, Output, SimpleChange, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-hijo',
  imports: [],
  templateUrl: './hijo.html',
  styleUrl: './hijo.css',
})
export class Hijo {

  @Input() recogePadre: number=0
  @Output() mandaalHijo = new EventEmitter<number>()

  ngOnChanges(changes: SimpleChanges): void{
    if(changes['recogePadre']){
      this.mandaalHijo.emit(this.recogePadre)
    }
  }
}
