import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LoginComponent} from '../componentes/login/login.component';
import {RegistroComponent} from '../componentes/registro/registro.component';
import {TurnosComponent} from '../componentes/turnos/turnos.component';
import {BienvenidaComponent} from '../componentes/bienvenida/bienvenida.component';
import {HorarioMedicosComponent} from '../componentes/horario-medicos/horario-medicos.component';
import {redirectUnauthorizedTo, canActivate} from "@angular/fire/auth-guard";
import {TurnosAConfirmarComponent} from '../componentes/turnos-aconfirmar/turnos-aconfirmar.component';
import {TurnosConfirmadosComponent} from '../componentes/turnos-confirmados/turnos-confirmados.component';

const redirectUnauthorizedToLogin=()=>redirectUnauthorizedTo(["login"]);

const routes: Routes = [
  {path:"", component:BienvenidaComponent},
  {path:"login", component:LoginComponent, data: {animation: 'Login'}},
  {path:"registro", component:RegistroComponent},
  {path:"home", component:HorarioMedicosComponent},
  {path:"turnos", component:TurnosComponent, data: {animation: 'Turnos'}, ...canActivate(redirectUnauthorizedToLogin)},
  {path:"pendientes", component:TurnosAConfirmarComponent},
  {path:"confirmados", component:TurnosConfirmadosComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class RutasRoutingModule { }
