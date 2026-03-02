import { Component } from '@angular/core';
import { proovedorModel } from '../../models/proveedores-model';
import { proveedorServices } from '../../services/proveedores';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-proveedores',
  imports: [FormsModule, CommonModule],
  templateUrl: './proveedores.html',
  styleUrl: './proveedores.css',
})
export class Proveedores {

  proveedor: proovedorModel = new proovedorModel()

  constructor(private proovedorService: proveedorServices){}

  guardar(){

    this.proovedorService.crearProveedor(this.proveedor).subscribe({
      next: (proveedores:any) => {
        alert("PROVEEDOR GUARDADO")
        this.proveedor = new proovedorModel()
      }
    })
  }

}
