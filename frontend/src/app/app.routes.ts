import { Routes } from '@angular/router';
import { Medio } from './components/medio/medio';
import { Login } from './components/login/login';
import { Registro } from './components/registro-users/registro-users';
import { NuevoLibro } from './components/add-libro/add-libro';
import { Historial } from './components/historial/historial';
import { Nuevo } from './components/nuevo/nuevo';

export const routes: Routes = [
  { path: '', component: Medio },   
  { path: 'login', component: Login },  
  { path: 'registro', component: Registro },
  { path: 'admin', component: NuevoLibro },
  { path: 'volver', component: Medio},
  { path: 'historial', component: Historial},
  { path: 'nuevo', component: Nuevo}

];