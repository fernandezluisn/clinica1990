import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule} from '@angular/forms';
import { NgxSpinnerModule } from "ngx-spinner";

import {AngularFireModule} from '@angular/fire'; 
import {environment} from '../environments/environment';
import {AngularFireAuth} from '@angular/fire/auth';
import {auth} from 'firebase/app';
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
import { ProfesionalComponent } from './componentes/profesional/profesional.component';

@NgModule({
  declarations: [
    AppComponent,
    TurnosComponent,
    LoginComponent,
    RegistroComponent,
    BienvenidaComponent,
    NavComponent,
    ProfesionalComponent
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
  providers: [ServicioService, AngularFireAuth, StorageService, BdaService],
  bootstrap: [AppComponent]
})
export class AppModule { }
