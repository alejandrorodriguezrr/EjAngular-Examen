import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-hijo',
  imports: [],
  templateUrl: './hijo.html',
  styleUrl: './hijo.css',
})
export class Hijo {

  @Input() userLogado: any;
  @Input() usuarios: any[] = []

  @Output() enviaralPadre = new EventEmitter<any[]>()
  @Output() borrarUsuario = new EventEmitter<number>()

  borrartodomenosLogado() :void{

  }

}
