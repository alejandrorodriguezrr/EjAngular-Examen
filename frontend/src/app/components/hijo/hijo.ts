import { Component, EventEmitter, Input, Output, output, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-hijo',
  imports: [],
  templateUrl: './hijo.html',
  styleUrl: './hijo.css',
})
export class Hijo {

  @Input() delpadre: number=0
  @Output() alpadre = new EventEmitter<string>()

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['delpadre']) {
      this.enviaralpadre();
    }
  }

  enviaralpadre() :void{

    let mensaje:string = ""

    if(this.delpadre>0){
      mensaje="Si tiene compras"
    }else{
      mensaje="No tiene compras"
    }
    this.alpadre.emit(mensaje)
  }

}
