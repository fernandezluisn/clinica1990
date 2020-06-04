import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LoginComponent} from '../componentes/login/login.component';
import {RegistroComponent} from '../componentes/registro/registro.component';
import {TurnosComponent} from '../componentes/turnos/turnos.component';
import {BienvenidaComponent} from '../componentes/bienvenida/bienvenida.component';

const routes: Routes = [
  {path:"", component:BienvenidaComponent},
  {path:"login", component:LoginComponent, data: {animation: 'Login'}},
  {path:"registro", component:RegistroComponent},
  {path:"turnos", component:TurnosComponent, data: {animation: 'Turnos'}}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class RutasRoutingModule { }
