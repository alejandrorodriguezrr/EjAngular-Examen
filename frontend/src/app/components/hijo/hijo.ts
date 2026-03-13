import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-hijo',
  imports: [],
  templateUrl: './hijo.html',
  styleUrl: './hijo.css',
})
export class Hijo {

  @Input() recibePadre: number=0

  mostrar=""
  numeroCompas=0
  
  ngOnChanges(changes: SimpleChanges){
      if(this.recibePadre==0){
        this.mostrar="El usuario tiene 0 compras"
      }else{
        this.mostrar="El usuario tiene alguna compra"
        this.numeroCompas=this.recibePadre
      }
    
  }

}
