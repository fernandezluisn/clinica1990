import { Component, OnInit, Input, Output, EventEmitter, SimpleChange, ɵConsole } from '@angular/core';
import { turno } from 'src/app/clases/turno';
import {TurnosPipe} from '../../pipes/turnos.pipe';
import { element } from 'protractor';
import { isUndefined } from 'util';



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
  @Output() pasarTurno:EventEmitter<any>=new EventEmitter<any>();

  txtBuscar:string;
  listaFiltrada:turno[];

  constructor() {
    
    this.txtBuscar="";
    
   }

  ngOnInit(): void {
    this.listaFiltrada=this.listaTurnos;
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

  pasarTurnoE(turno){
    this.pasarTurno.emit(turno);
    
  }

  filtrarLista(){

    let listaB:turno[]=new Array();


    this.listaTurnos.filter(element=>{
      if(element.empleado.apellido.includes(this.txtBuscar) || element.empleado.nombre.includes(this.txtBuscar) || element.especialidad.includes(this.txtBuscar) ||
      element.paciente.apellido.includes(this.txtBuscar) || element.paciente.nombre.includes(this.txtBuscar) || element.fecha.toString().includes(this.txtBuscar) ||
      element.estado.includes(this.txtBuscar)){
        listaB.push(element);
      }else

      if(!isUndefined(element.temperatura)){
        if(element.temperatura.toString().includes(this.txtBuscar)){
          listaB.push(element);
        }
      }
    })

    this.listaFiltrada=listaB;

  }
 

}
