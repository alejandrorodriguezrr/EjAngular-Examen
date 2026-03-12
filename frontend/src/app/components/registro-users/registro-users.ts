import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  ReactiveFormsModule,
  Validators,
  AbstractControl,
  ValidationErrors
} from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { finalize } from 'rxjs/operators';

import { ClientesServices } from '../../services/clientes-services';
import { ClientesModel } from '../../models/clientes-model';
import { ComprasServices } from '../../services/compras-services';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './registro-users.html',
  styleUrls: ['./registro-users.css']
})
export class Registro {
  private fb = inject(FormBuilder);
  private router = inject(Router);
  private clientesService = inject(ClientesServices);

  constructor(private comprasService:ComprasServices){}

  loading = false;
  errorMsg = '';
  successMsg = '';
  numerodeCompras:number=0
  numerodeClientes:number=0

  form = this.fb.nonNullable.group({
    nombre: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(40)]],
    apellidos: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(60)]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(8), Registro.passwordStrong]],
    direccion: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(120)]],
    telefono: ['', [Validators.required, Validators.pattern(/^[0-9]{9,15}$/)]], // string
  });

  get f() {
    return this.form.controls;
  }

  static passwordStrong(control: AbstractControl): ValidationErrors | null {
    const v = String(control.value || '');
    const ok = /[a-z]/.test(v) && /[A-Z]/.test(v) && /[0-9]/.test(v);
    return ok ? null : { passwordStrong: true };
  }

  onSubmit(): void {
    this.errorMsg = '';
    this.successMsg = '';

    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.comprasService.mostrarCompras().subscribe({
      next: (compras:any) => {
        this.numerodeCompras=compras.length
        this.clientesService.mostrarClientes().subscribe({
          next: (clientes:any) => {
            this.numerodeClientes=clientes.length

            if(this.numerodeCompras>this.numerodeClientes){
              this.loading = true;

    const payload = this.form.getRawValue();

    const nuevoCliente: Omit<ClientesModel, '_id'> = {
      nombre: payload.nombre.trim(),
      apellidos: payload.apellidos.trim(),
      email: payload.email.trim().toLowerCase(),
      password: payload.password,
      direccion: payload.direccion.trim(),
      telefono: Number(payload.telefono)
    };

    this.clientesService.crearCliente(nuevoCliente)
      .pipe(finalize(() => (this.loading = false)))
      .subscribe({
        next: (res: any) => {
          this.successMsg = 'Registro completado con éxito. Ya puedes iniciar sesión.';
          this.errorMsg = '';

          if (res?.token) localStorage.setItem('token', res.token);
          if (res?.cliente || res?.user) {
            localStorage.setItem('user', JSON.stringify(res.cliente ?? res.user));
          }

          this.form.reset({
            nombre: '',
            apellidos: '',
            email: '',
            password: '',
            direccion: '',
            telefono: ''
          });

          setTimeout(() => {
            this.router.navigate(['/login']);
          }, 1500);
        },
        error: (err) => {
          if (err?.status === 409) {
            this.errorMsg = 'Ese email ya está registrado.';
          } else if (err?.status === 400) {
            this.errorMsg = err?.error?.error ?? 'Datos inválidos. Revisa el formulario.';
          } else {
            this.errorMsg = err?.error?.error ?? err?.error?.message ?? 'No se pudo completar el registro';
          }

          this.successMsg = '';
        }
      });
            }else{
              this.errorMsg="No puedes añadir mas usuarios"
              return
            }

          }
        })

      }
    })

    
  }
}
