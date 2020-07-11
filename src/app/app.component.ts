import { Component} from '@angular/core';  
import { slideInAnimation } from './animation';
import { RouterOutlet } from '@angular/router';
import {TurnosPipe} from 'src/app/pipes/turnos.pipe';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [
    slideInAnimation
  ]
})
export class AppComponent {
  
  title = 'Clinica';

  prepareRoute(outlet: RouterOutlet) {
    return outlet && outlet.activatedRouteData && outlet.activatedRouteData.animation;
  }
}
