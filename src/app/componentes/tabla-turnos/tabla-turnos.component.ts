import { Component, OnInit, Input } from '@angular/core';
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

  constructor() { }

  ngOnInit(): void {
  }

  aprobar(){

  }

  cancelar(){

  }

}
