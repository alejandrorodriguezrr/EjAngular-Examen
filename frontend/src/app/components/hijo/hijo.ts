import { Component, EventEmitter, Input, Output, output } from '@angular/core';
import { NgIf } from "../../../../node_modules/@angular/common/types/_common_module-chunk";

@Component({
  selector: 'app-hijo',
  imports: [],
  templateUrl: './hijo.html',
  styleUrl: './hijo.css',
})
export class Hijo {

  @Input() productosTotales:number=0
  @Output() enviaralPadre = new EventEmitter<string>()

  ngOnInit(){

    if(this.productosTotales>0){
      this.enviaralPadre.emit('GRACIAS')
    }

  }
}
