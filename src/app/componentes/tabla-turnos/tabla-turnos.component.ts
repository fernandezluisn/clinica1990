import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { turno } from 'src/app/clases/turno';
import {TurnosPipe} from '../../pipes/turnos.pipe';

@Component({
  selector: 'app-tabla-turnos',
  templateUrl: './tabla-turnos.component.html',
  styleUrls: ['./tabla-turnos.component.css']
})
export class TablaTurnosComponent implements OnInit {

  @Input() confirmados:boolean;
  @Input() listaTurnos:turno[];
  @Output() aprobarTurno:EventEmitter<any>=new EventEmitter<any>();
  @Output() cancelarTurno:EventEmitter<any>=new EventEmitter<any>();

  constructor() { }

  ngOnInit(): void {
  }

  aprobar(turno){
    this.aprobarTurno.emit(turno);
  }

  cancelar(turno){
    this.cancelarTurno.emit(turno);
  }

}
