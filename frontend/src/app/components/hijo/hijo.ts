import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-hijo',
  imports: [],
  templateUrl: './hijo.html',
  styleUrl: './hijo.css',
})
export class Hijo {

  @Input() reciboPadre:number=0;
  @Output() mandoPadre = new EventEmitter<String>();


  ngOnChanges(changes: SimpleChanges){
    this.mandoPadre.emit("GRACIAS")
  }

}
