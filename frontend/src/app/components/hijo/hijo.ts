import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-hijo',
  imports: [],
  templateUrl: './hijo.html',
  styleUrl: './hijo.css',
})
export class Hijo {

  @Input() recogePadre:number=0
  @Output() enviadelHijo=new EventEmitter<string>()

  ngOnChanges(changes:SimpleChanges){
    if(changes['recogePadre']){
      if(this.recogePadre===0){
        this.enviadelHijo.emit("No ha hecho ninguna compra")
      }else{
        this.enviadelHijo.emit("Ha hecho alguna compra")
      }
    }
  }

}
