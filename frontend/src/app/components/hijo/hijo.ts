import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-hijo',
  imports: [],
  templateUrl: './hijo.html',
  styleUrl: './hijo.css',
})
export class Hijo {

  @Input() idUsuario: string = ''
  @Output() emailUsuario = new EventEmitter<string>(); 

  email: string=""

  ngOnInit(): void{
    const texto = localStorage.getItem('user')

    if(texto){
      const usuario=JSON.parse(texto)
      this.email=usuario.email

      this.emailUsuario.emit(this.email)
    }
  }

}
