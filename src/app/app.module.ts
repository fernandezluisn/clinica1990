import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';



import { AppComponent } from './app.component';
import {RutasRoutingModule} from '../app/rutas/rutas-routing.module';
import { TurnosComponent } from './componentes/turnos/turnos.component';
import { LoginComponent } from './componentes/login/login.component';
import { RegistroComponent } from './componentes/registro/registro.component';
import { BienvenidaComponent } from './componentes/bienvenida/bienvenida.component';
import { ServicioService } from './servicio.service';

@NgModule({
  declarations: [
    AppComponent,
    TurnosComponent,
    LoginComponent,
    RegistroComponent,
    BienvenidaComponent
  ],
  imports: [
    BrowserModule,
    RutasRoutingModule
  ],
  providers: [ServicioService],
  bootstrap: [AppComponent]
})
export class AppModule { }
