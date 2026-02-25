import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { Router } from '@angular/router';

import { LibrosServices } from '../../services/libros-services';
import { LibroModel } from '../../models/libro-model';
import { ComprasServices } from '../../services/compras-services';

declare var M: any;

@Component({
  selector: 'app-nuevo-libro',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './add-libro.html',
  styleUrls: ['./add-libro.css']
})
export class NuevoLibro implements OnInit {
  selectedFile: File | null = null;

  nombreLibro: string = ""

  constructor(
    public libroService: LibrosServices,
    private router: Router,
    private comprasService: ComprasServices
  ) {}

  ngOnInit(): void {
    this.libroService.libroSeleccionado = new LibroModel();
    this.obtenerLibros();
    this.cargarProductomasVendido()
  }

  cargarProductomasVendido(): void {

    this.comprasService.mostrarCompras().subscribe({
      next: (data: any) => {

        const compras = Array.isArray(data) ? data : data.compras ?? [];
        const contador: {[titulo: string]: number } = {}

        compras.forEach((compra: any) => {
          compra.forEach((libro: any) => {
            
            if(!contador[libro.titulo]){
              contador[libro.titulo]=0
            }

            contador[libro.titulo]++
          });
        });

        this.nombreLibro = Object.keys(contador).reduce((a,b) => 
          contador[a] > contador[b] ? a:b
        )
      }
    })

  } 

  obtenerLibros(): void {
    this.libroService.mostrarLibros().subscribe({
      next: (res: any) => {
        this.libroService.libros = res as LibroModel[];
      },
      error: (err) => console.error('Error al obtener libros:', err)
    });
  }

  resetForm(form: NgForm): void {
    if (form) {
      form.resetForm();
      this.libroService.libroSeleccionado = new LibroModel();
      this.selectedFile = null;
      
      const fileInput = document.querySelector('input[type="file"]') as HTMLInputElement;
      if (fileInput) {
        fileInput.value = '';
      }
    }
  }

  addLibro(form: NgForm): void {
    if (form.invalid) {
      form.control.markAllAsTouched();
      return;
    }

    if (form.value._id) {
      this.libroService.actualizarLibro(form.value, this.selectedFile || undefined).subscribe({
        next: () => {
          this.obtenerLibros();
          this.resetForm(form);
          M.toast({ html: 'Libro actualizado' });
        },
        error: (err) => {
          console.error('Error al actualizar libro:', err);
          M.toast({ html: 'Error al actualizar' });
        }
      });

    } else {
      const nuevoLibro = { ...form.value };
      delete nuevoLibro._id;

      this.libroService.crearLibro(nuevoLibro, this.selectedFile || undefined).subscribe({
        next: () => {
          this.resetForm(form);
          this.obtenerLibros();
          M.toast({ html: 'Libro almacenado' });
        },
        error: (err) => {
          console.error('Error al guardar libro:', err);
          M.toast({ html: 'Error al guardar' });
        }
      });
    }
  }

  editarLibro(libro: LibroModel): void {
    this.libroService.libroSeleccionado = { ...libro };
    this.selectedFile = null; 
    
    const fileInput = document.querySelector('input[type="file"]') as HTMLInputElement;
    if (fileInput) {
      fileInput.value = '';
    }
  }

  BorrarLibro(_id: string): void {
    if (confirm('¿Desea eliminar el libro?')) {
      this.libroService.borrarLibro(_id).subscribe({
        next: () => {
          this.obtenerLibros();
          M.toast({ html: 'Libro eliminado' });
        },
        error: (err) => {
          console.error('Error al borrar libro:', err);
          M.toast({ html: 'Error al eliminar' });
        }
      });
    }
  }

  volver(): void {
    this.router.navigate(['/volver']);
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    const file = input.files && input.files.length ? input.files[0] : null;

    if (!file) {
      this.selectedFile = null;
      return;
    }

    const okType = file.type === 'image/png' || file.type === 'image/jpeg';
    if (!okType) {
      alert('Solo se permiten imágenes PNG o JPG.');
      input.value = '';
      this.selectedFile = null;
      return;
    }

    this.selectedFile = file;
  }

}