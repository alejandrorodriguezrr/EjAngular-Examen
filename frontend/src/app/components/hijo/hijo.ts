import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { Input } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-hijo',
  imports: [CommonModule, FormsModule],
  templateUrl: './hijo.html',
  styleUrl: './hijo.css',
})
export class Hijo {

  @Input() productosTotales:number=0
  @Output() enviaralHijo:any= new EventEmitter<string>()

  ngOnChanges(): void{
    if(this.productosTotales>0){
      this.enviaralHijo.emit('GRACIAS')
    }
  }

}
