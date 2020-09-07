import { Component, OnInit } from '@angular/core';
import { turno } from 'src/app/clases/turno';
import { ServicioService } from 'src/app/servicios/servicio.service';
import { TurnosService } from 'src/app/servicios/turnos.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { comentario } from 'src/app/clases/comentario';


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
  vacio=true;
  cargo=false;

  comentarios:comentario[];

  constructor(private servicio:ServicioService, private turnosService:TurnosService, private ngx:NgxSpinnerService) { 
  
    this.servicio.tomarUsuario().then(res=>{
      this.user=res;
    })

    this.traerTurnos();
    
    this.turnosService.devolverListadoComentarios().subscribe(listaC=>{
      this.comentarios=listaC;
    });

  }


  ngOnInit(): void {
  }

  traerTurnos(){
    let a=null;
    a=new Array();
    let d=new Date();
    
    this.turnosService.devolverListadoTurnos().subscribe(lista=>
      {
        lista.filter(element=>{
          if(element.paciente.email.toLowerCase()==this.user.email.toLowerCase() && Number(Date.parse(element.fecha.toString()))<=Number(Date.parse(d.toString())))
          a.push(element);
        })
        this.chequear(a);
        
        
      })

      

      
      
  }

  chequear(lista){
    if(lista.length>0){
      this.turnosDelPaciente=lista;
      this.turnosDelPaciente.sort((a,b) => Number(Date.parse(a.fecha.toString())) - Number(Date.parse(b.fecha.toString())));
      
      this.vacio=false;
      this.cargo=true;
    }else
    this.cargo=true;
  }
  
  tomarTurno(turno){
    this.turnoParaDetalle=turno;
    this.hayTurno=true;
  }

  spinner(){
    if(this.cargo==false)
    {
      this.ngx.show();
      setTimeout(()=>{
        this.ngx.hide();
      }, 2000)
    }
    
  }

}
