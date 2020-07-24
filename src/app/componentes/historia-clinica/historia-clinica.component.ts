import { Component, OnInit } from '@angular/core';
import { turno } from 'src/app/clases/turno';
import { ServicioService } from 'src/app/servicios/servicio.service';
import { TurnosService } from 'src/app/servicios/turnos.service';

@Component({
  selector: 'app-historia-clinica',
  templateUrl: './historia-clinica.component.html',
  styleUrls: ['./historia-clinica.component.css']
})
export class HistoriaClinicaComponent implements OnInit {

  turnosDelPaciente:turno[];
  user;
  turnoParaDetalle:turno;
  hayTurno=false;
  vacio:boolean;

  constructor(private servicio:ServicioService, private turnosService:TurnosService) { 
  
    this.servicio.tomarUsuario().then(res=>{
      this.user=res;
    })

    this.traerTurnos();
  

  }


  ngOnInit(): void {
  }

  traerTurnos(){
    let a=new Array();
    let d=new Date();
    
    this.turnosService.devolverListadoTurnos().subscribe(lista=>
      {
        lista.filter(element=>{
          if(element.paciente.email.toLowerCase()==this.user.email.toLowerCase() && Number(Date.parse(element.fecha.toString()))<=Number(Date.parse(d.toString())))
          a.push(element);
        })
      })

      if(a.length>0){
        this.turnosDelPaciente=a;
        this.turnosDelPaciente.sort((a,b) => Number(Date.parse(a.fecha.toString())) - Number(Date.parse(b.fecha.toString())));
        this.vacio=false;
      }else{
        this.vacio=true;
      }
      
  }
  
  tomarTurno(turno){
    this.turnoParaDetalle=turno;
    this.hayTurno=true;
  }

}
