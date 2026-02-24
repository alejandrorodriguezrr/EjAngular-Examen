import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { CommonModule } from '@angular/common';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-head',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './head.html',
  styleUrl: './head.css'
})
export class Head implements OnInit {

  usuario: any = null;

  private readonly CLAVE_USUARIO = 'user';
  private readonly CLAVE_AUTENTICADO = 'autenticado';

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.cargarSesion();

    this.router.events
      .pipe(filter(e => e instanceof NavigationEnd))
      .subscribe(() => this.cargarSesion());
  }

  cargarSesion(): void {
    const autenticado = localStorage.getItem(this.CLAVE_AUTENTICADO) === 'true';
    const textoUsuario = localStorage.getItem(this.CLAVE_USUARIO);

    if (!autenticado || !textoUsuario) {
      this.usuario = null;
      return;
    }

    try {
      this.usuario = JSON.parse(textoUsuario);
    } catch {
      this.usuario = null;
    }
  }

  obtenerNombre(): string {
    
    return this.usuario?.nombre
      || this.usuario?.nombreUsuario
      || this.usuario?.username
      || this.usuario?.email
      || '';
  }

  estaLogueado(): boolean {
    return this.usuario !== null;
  }

  irLogin(): void {
    this.router.navigate(['/login']);
  }

  irHistorial(): void {
    this.router.navigate(['/historial']);
  }

  cerrarSesion(): void {
    localStorage.removeItem(this.CLAVE_USUARIO);
    localStorage.removeItem(this.CLAVE_AUTENTICADO);
    this.usuario = null;
    this.router.navigate(['/']);
  }
}
