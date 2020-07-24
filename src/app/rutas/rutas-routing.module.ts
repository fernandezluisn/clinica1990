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
import {HomeMedicoComponent} from '../componentes/home-medico/home-medico.component';
import {AgregarAdminComponent} from '../componentes/agregar-admin/agregar-admin.component';
import {HabilitarUsuariosComponent} from '../componentes/habilitar-usuarios/habilitar-usuarios.component';
import {AtencionPacienteComponent} from '../componentes/atencion-paciente/atencion-paciente.component';
import {TurnosSacadosComponent} from '../componentes/turnos-sacados/turnos-sacados.component';
import {HistoriaClinicaComponent} from '../componentes/historia-clinica/historia-clinica.component';
import {EncuestaComponent} from '../componentes/encuesta/encuesta.component';
import {ComentarioComponent} from '../componentes/comentario/comentario.component';

const redirectUnauthorizedToLogin=()=>redirectUnauthorizedTo(["login"]);

const routes: Routes = [
  {path:"", component:BienvenidaComponent},
  {path:"login", component:LoginComponent, data: {animation: 'Login'}},
  {path:"registro", component:RegistroComponent},
  {path:"homeAdmin", component:HorarioMedicosComponent, ...canActivate(redirectUnauthorizedToLogin)},
  {path:"turnos", component:TurnosComponent, data: {animation: 'Turnos'}, ...canActivate(redirectUnauthorizedToLogin)},
  {path:"turnosAprobados", component:TurnosSacadosComponent, ...canActivate(redirectUnauthorizedToLogin)},
  {path:"pendientes", component:TurnosAConfirmarComponent, ...canActivate(redirectUnauthorizedToLogin)},
  {path:"homeMedico", component:HomeMedicoComponent, ...canActivate(redirectUnauthorizedToLogin)},
  {path:"atencion", component:AtencionPacienteComponent, ...canActivate(redirectUnauthorizedToLogin)},
  {path:"altaAdmin", component:AgregarAdminComponent, ...canActivate(redirectUnauthorizedToLogin)},
  {path:"altaUsuario", component:HabilitarUsuariosComponent, ...canActivate(redirectUnauthorizedToLogin)},
  {path:"comentario/:idTurno", component:ComentarioComponent, ...canActivate(redirectUnauthorizedToLogin)},
  {path:"encuesta/:idTurno", component:EncuestaComponent, ...canActivate(redirectUnauthorizedToLogin)},
  {path:"historiaClinica", component:HistoriaClinicaComponent, ...canActivate(redirectUnauthorizedToLogin), data: {animation: 'HistoriaClinica'}},
  {path:"confirmados", component:TurnosConfirmadosComponent, ...canActivate(redirectUnauthorizedToLogin)}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class RutasRoutingModule { }
