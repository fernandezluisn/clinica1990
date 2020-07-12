import { Component, OnInit, Input, Output, EventEmitter, SimpleChange, ɵConsole } from '@angular/core';
import { turno } from 'src/app/clases/turno';
import {TurnosPipe} from '../../pipes/turnos.pipe';
import { element } from 'protractor';



@Component({
  selector: 'app-tabla-turnos',
  templateUrl: './tabla-turnos.component.html',
  styleUrls: ['./tabla-turnos.component.css']
})
export class TablaTurnosComponent implements OnInit {

  @Input() resenia=false;
  @Input() noConfirmados=false;
  @Input() confirmados=false;
  @Input() listaTurnos:turno[];
  @Output() aprobarTurno:EventEmitter<any>=new EventEmitter<any>();
  @Output() cancelarTurno:EventEmitter<any>=new EventEmitter<any>();

  constructor() {
    
   }

  ngOnInit(): void {
  }

  ngOnChanges() {
    if(this.confirmados==true)
    console.log();
}

  aprobar(turno){
    this.aprobarTurno.emit(turno);
  }

  cancelar(turno){
    this.cancelarTurno.emit(turno);
  }

 

}
