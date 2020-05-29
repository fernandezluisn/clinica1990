import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule} from '@angular/forms';

import {AngularFireModule} from '@angular/fire'; 
import {environment} from '../environments/environment';
import {AngularFireAuth} from '@angular/fire/auth';
import {auth} from 'firebase/app';

import { AppComponent } from './app.component';
import {RutasRoutingModule} from '../app/rutas/rutas-routing.module';
import { TurnosComponent } from './componentes/turnos/turnos.component';
import { LoginComponent } from './componentes/login/login.component';
import { RegistroComponent } from './componentes/registro/registro.component';
import { BienvenidaComponent } from './componentes/bienvenida/bienvenida.component';
import { ServicioService } from './servicio.service';
import { NavComponent } from './componentes/nav/nav.component';

@NgModule({
  declarations: [
    AppComponent,
    TurnosComponent,
    LoginComponent,
    RegistroComponent,
    BienvenidaComponent,
    NavComponent
  ],
  imports: [
    BrowserModule,
    RutasRoutingModule, 
    AngularFireModule.initializeApp(environment.firebaseConfig),
    FormsModule
  ],
  providers: [ServicioService, AngularFireAuth],
  bootstrap: [AppComponent]
})
export class AppModule { }
