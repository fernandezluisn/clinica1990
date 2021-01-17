import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { turno } from 'src/app/clases/turno';

import { isNullOrUndefined } from 'util';



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

    this.filtrarLista();
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
      if(element.empleado.apellido.toLowerCase().includes(this.txtBuscar.toLowerCase()) || 
      element.empleado.nombre.toLowerCase().includes(this.txtBuscar.toLowerCase()) || 
      element.especialidad.toLowerCase().includes(this.txtBuscar.toLowerCase()) ||
      element.paciente.apellido.toLowerCase().includes(this.txtBuscar.toLowerCase()) || 
      element.paciente.nombre.toLowerCase().includes(this.txtBuscar.toLowerCase()) || 
      element.fecha.toString().includes(this.txtBuscar) ||
      element.estado.toLowerCase().includes(this.txtBuscar.toLowerCase())){
        listaB.push(element);
      }else

      if(!isNullOrUndefined(element.temperatura)){
        if(element.temperatura.toString().includes(this.txtBuscar)){
          listaB.push(element);
        }
      }else if (!isNullOrUndefined(element.dato1v) && element.dato1v.includes(this.txtBuscar)){        
        listaB.push(element);
      }else if (!isNullOrUndefined(element.dato2v && element.dato2v.includes(this.txtBuscar))){        
        listaB.push(element);
      }else if (!isNullOrUndefined(element.dato3v) && element.dato3v.includes(this.txtBuscar)){        
        listaB.push(element);
      }else if(!isNullOrUndefined(element.resenia) && element.resenia.includes(this.txtBuscar)){
        listaB.push(element);
      }
    })

    
    
    this.listaFiltrada=listaB;

  }

 

}
