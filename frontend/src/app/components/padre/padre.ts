import { Component } from '@angular/core';
import { Hijo } from "../hijo/hijo";

@Component({
  selector: 'app-padre',
  imports: [Hijo],
  templateUrl: './padre.html',
  styleUrl: './padre.css',
})
export class Padre {

  usuarioLogado: any=null

  ngOnInit(){
      const userRaw = localStorage.getItem('user');

      if(userRaw){
        this.usuarioLogado=JSON.parse(userRaw)
      }

  }


}
