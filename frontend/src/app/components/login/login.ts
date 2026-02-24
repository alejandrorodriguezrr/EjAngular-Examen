import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule, RouterLink } from '@angular/router';
import { finalize } from 'rxjs/operators';

import { ClientesServices } from '../../services/clientes-services';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule, RouterLink],
  templateUrl: './login.html',
  styleUrls: ['./login.css']
})
export class Login {
  private fb = inject(FormBuilder);
  private router = inject(Router);
  private clientesService = inject(ClientesServices);

  loading = false;
  errorMsg = '';

  form = this.fb.nonNullable.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(8)]]
  });

  get f() {
    return this.form.controls;
  }

  onSubmit(): void {
    this.errorMsg = '';

    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const payload = this.form.getRawValue();
    const emailLower = payload.email.trim().toLowerCase();
    const password = payload.password;

    if (emailLower === 'admin@admin.com' && password === 'admin1234') {
      const adminUser = {
        _id: 'admin',
        email: 'admin@admin.com',
        tipo: 'Admin',
        nombre: 'Administrador'
      };
      localStorage.setItem('user', JSON.stringify(adminUser));
      localStorage.setItem('autenticado', 'true');
      
      this.router.navigate(['/admin']);
      return;
    }

    this.loading = true;

    const credenciales = {
      email: emailLower,
      password: password,
      tipo: 'Usuario'
    };

    this.clientesService.autenticarCliente(credenciales as any)
      .pipe(finalize(() => (this.loading = false)))
      .subscribe({
        next: (res: any) => {
          console.log("RESPUESTA LOGIN:", res);

          if (res?.autenticado === true && res?.cliente) {
            const cliente = res.cliente;
            cliente._id = cliente._id ?? cliente.id;
            localStorage.setItem('user', JSON.stringify(cliente));
            localStorage.setItem('autenticado', 'true');

            this.router.navigate(['/']);
          } else {
            this.errorMsg = 'Email o contraseña incorrectos.';
          }
        },
        error: (err) => {
          console.error('Error del backend:', err);
          const status = err?.status;

          if (status === 401 || status === 400) {
            this.errorMsg = 'Email o contraseña incorrectos.';
          } else if (status === 500) {
            this.errorMsg = 'Error en el servidor. Inténtalo de nuevo.';
          } else {
            this.errorMsg = err?.error?.error ?? err?.error?.message ?? 'Error al iniciar sesión';
          }
        }
      });
  }
}