import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { empleado } from '../../clases/empleado';


@Component({
  selector: 'app-tabla-medicos',
  templateUrl: './tabla-medicos.component.html',
  styleUrls: ['./tabla-medicos.component.css']
})
export class TablaMedicosComponent implements OnInit {

  @Input() listaMedicos:empleado;
  @Output() saleMedico:EventEmitter<any>= new EventEmitter<any>();
  constructor() { }

  ngOnInit(): void {
  }

  evento(medico){
    this.saleMedico.emit(medico);
  }

}
