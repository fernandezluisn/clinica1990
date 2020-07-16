import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule} from '@angular/forms';
import { NgxSpinnerModule } from "ngx-spinner";


import {AngularFireModule} from '@angular/fire'; 
import {environment} from '../environments/environment';
import {AngularFireAuth} from '@angular/fire/auth';



import {AngularFireStorageModule} from '@angular/fire/storage';
import {RecaptchaModule, RecaptchaFormsModule} from 'ng-recaptcha';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';



import { AppComponent } from './app.component';
import {RutasRoutingModule} from '../app/rutas/rutas-routing.module';
import { TurnosComponent } from './componentes/turnos/turnos.component';
import { LoginComponent } from './componentes/login/login.component';
import { RegistroComponent } from './componentes/registro/registro.component';
import { BienvenidaComponent } from './componentes/bienvenida/bienvenida.component';
import { ServicioService } from './servicios/servicio.service';
import {StorageService} from './servicios/storage.service';
import {BdaService} from './servicios/bda.service';
import { NavComponent } from './componentes/nav/nav.component';
import { HorarioMedicosComponent } from './componentes/horario-medicos/horario-medicos.component';
import { TablaTurnosComponent } from './componentes/tabla-turnos/tabla-turnos.component';
import { TurnosPipe } from './pipes/turnos.pipe';
import { TablaMedicosComponent } from './componentes/tabla-medicos/tabla-medicos.component';
import { AgregarEspecialidadComponent } from './componentes/agregar-especialidad/agregar-especialidad.component';
import { DetalleEmpleadoComponent } from './componentes/detalle-empleado/detalle-empleado.component';
import { TurnosAConfirmarComponent } from './componentes/turnos-aconfirmar/turnos-aconfirmar.component';
import { TurnosConfirmadosComponent } from './componentes/turnos-confirmados/turnos-confirmados.component';
import { HomeMedicoComponent } from './componentes/home-medico/home-medico.component';
import { AgregarAdminComponent } from './componentes/agregar-admin/agregar-admin.component';
import { HabilitarUsuariosComponent } from './componentes/habilitar-usuarios/habilitar-usuarios.component';
import { AtencionPacienteComponent } from './componentes/atencion-paciente/atencion-paciente.component';
import { TurnosHoraPipe } from './pipes/turnos-hora.pipe';
import { TurnosCuarentaPipe } from './pipes/turnos-cuarenta.pipe';


import { DatePipe } from '@angular/common';
import { TurnosSacadosComponent } from './componentes/turnos-sacados/turnos-sacados.component';
import { HistoriaClinicaComponent } from './componentes/historia-clinica/historia-clinica.component';
import { EncuestaComponent } from './componentes/encuesta/encuesta.component';
import { DetalleReseniaComponent } from './componentes/detalle-resenia/detalle-resenia.component';
import { ComentarioComponent } from './componentes/comentario/comentario.component';



@NgModule({
  declarations: [
    AppComponent,
    TurnosComponent,
    LoginComponent,
    RegistroComponent,
    BienvenidaComponent,
    NavComponent,
    HorarioMedicosComponent,
    TablaTurnosComponent,
    TurnosPipe,
    TablaMedicosComponent,
    AgregarEspecialidadComponent,
    DetalleEmpleadoComponent,
    TurnosAConfirmarComponent,
    TurnosConfirmadosComponent,
    HomeMedicoComponent,
    AgregarAdminComponent,
    HabilitarUsuariosComponent,
    AtencionPacienteComponent,
    TurnosHoraPipe,
    TurnosCuarentaPipe,
    TurnosSacadosComponent,
    HistoriaClinicaComponent,
    EncuestaComponent,
    DetalleReseniaComponent,
    ComentarioComponent
  ],
  imports: [
    BrowserModule,
    RutasRoutingModule, 
    AngularFireModule.initializeApp(environment.firebaseConfig),
    FormsModule, 
    AngularFireStorageModule,
    RecaptchaModule,
    RecaptchaFormsModule,
    BrowserAnimationsModule,
    NgxSpinnerModule
  ],
  providers: [ServicioService, AngularFireAuth, StorageService, BdaService, DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
