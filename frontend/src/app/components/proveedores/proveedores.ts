import { Component } from '@angular/core';
import { ProveedorModel } from '../../models/proveedor-model';
import { Proveedor } from '../../services/proveedor';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-proveedores',
  imports: [FormsModule],
  templateUrl: './proveedores.html',
  styleUrl: './proveedores.css',
})
export class Proveedores {

  proveedor: ProveedorModel = new ProveedorModel()

  constructor(private proveedorService: Proveedor){}

  guardar(){
    console.log('Proveedor:',this.proveedor)
    this.proveedorService.crearProveedor(this.proveedor).subscribe({
      next: (proveedor:any) => {
        console.log('Respuesta:',proveedor)
        alert("Proveedor guardado")
        proveedor=new ProveedorModel()
      },
      error: (err) => {
        console.error(err)
      }
    })
  }

}
