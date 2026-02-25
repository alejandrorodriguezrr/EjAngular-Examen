import { Component } from '@angular/core';
import { LibrosServices } from '../../services/libros-services';
import { LibroModel } from '../../models/libro-model';
import { Hijo } from "../hijo/hijo";

@Component({
  selector: 'app-padre',
  imports: [Hijo],
  templateUrl: './padre.html',
  styleUrl: './padre.css',
})
export class Padre {

  selectedFile: File | null=null;
  libroAeditar: LibroModel | null=null

  constructor(private libroServices: LibrosServices){}

  editarLibro(libro: LibroModel): void {
      this.libroServices.libroSeleccionado = { ...libro };
      this.libroAeditar={...libro}
      this.selectedFile = null; 
      
      const fileInput = document.querySelector('input[type="file"]') as HTMLInputElement;
      if (fileInput) {
        fileInput.value = '';
      }
  }
}
