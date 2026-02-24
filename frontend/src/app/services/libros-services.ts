import { Injectable } from '@angular/core';
import { LibroModel } from '../models/libro-model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class LibrosServices {
  libroSeleccionado: LibroModel;
  libros: LibroModel[];
  URL='http://localhost:5000/api/libros/';

  constructor(private http : HttpClient){
    this.libroSeleccionado = new LibroModel();
    this.libros = [];
  }

  mostrarLibros(){
    return this.http.get(this.URL);
  }

  mostrarLibro(id: String){
    return this.http.get(this.URL + id);
  }

  crearLibro(Libro: LibroModel, imagen?: File){
    const formData = new FormData();
    
    formData.append('titulo', Libro.titulo || '');
    formData.append('autor', Libro.autor || '');
    formData.append('editorial', Libro.editorial || '');
    formData.append('genero', Libro.genero || '');
    formData.append('precio', Libro.precio?.toString() || '0');
    formData.append('stock', Libro.stock?.toString() || '0');
    
    if (imagen) {
      formData.append('imagen', imagen);
    }
    
    return this.http.post(this.URL, formData);
  }

  actualizarLibro(Libro: LibroModel, imagen?: File){
    const formData = new FormData();
    
    formData.append('titulo', Libro.titulo || '');
    formData.append('autor', Libro.autor || '');
    formData.append('editorial', Libro.editorial || '');
    formData.append('genero', Libro.genero || '');
    formData.append('precio', Libro.precio?.toString() || '0');
    formData.append('stock', Libro.stock?.toString() || '0');
    
    if (imagen) {
      formData.append('imagen', imagen);
    }
    
    return this.http.put(this.URL + Libro._id, formData);
  }

  borrarLibro(id: String){
    return this.http.delete(this.URL + id);
  }

}