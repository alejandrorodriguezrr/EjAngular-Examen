import { Component, signal } from '@angular/core';
import { RouterOutlet, Router, NavigationEnd } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Head } from "./components/head/head";
import { Latizq } from "./components/latizq/latizq";
import { Latder } from "./components/latder/latder";
import { Footer } from "./components/footer/footer";
import { Medio } from "./components/medio/medio";
import { Main } from "./components/main/main";
import { Nuevo } from "./components/nuevo/nuevo";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, Head, Latizq, Latder, Footer, Medio, Main, CommonModule, Nuevo],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('frontend');

  isAuthPage = false; 

  categoriaActual = '';

  establecerCategoria(categoria: string): void {
  this.router.navigate([], {
    queryParams: { genero: categoria || null },
    queryParamsHandling: 'merge'
  });
}

  constructor(private router: Router) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        const url = event.urlAfterRedirects.split('?')[0];

        this.isAuthPage = (url === '/login' || url === '/registro' || url === '/register' || url === '/admin' || url === '/historial');
      }
    });
  }
}