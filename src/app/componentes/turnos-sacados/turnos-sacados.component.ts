import { Component, OnInit } from '@angular/core';
import { TurnosService } from 'src/app/servicios/turnos.service';
import { turno } from 'src/app/clases/turno';
import { ServicioService } from 'src/app/servicios/servicio.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-turnos-sacados',
  templateUrl: './turnos-sacados.component.html',
  styleUrls: ['./turnos-sacados.component.css']
})
export class TurnosSacadosComponent implements OnInit {

  hayTurnos:boolean;
  turnosDelPaciente:turno[];
  hayUsuario=false;
  user;
  mostrar:boolean=false;

  mostrarT=false;
  mensaje:string;
  color:string;

  constructor(private turnosService:TurnosService, private service:ServicioService, private router:Router) { 
    this.turnosDelPaciente=new Array();
    
    this.service.tomarUsuario().then(res=>{
      this.user=res;
      this.hayUsuario=true;    
       
      this.cargarTurnos();
    })
    
  }

  ngOnInit(): void {
  }

  cargarTurnos(){

    let d=new Date();

    let j=new Array;
    this.turnosService.devolverListadoTurnos().subscribe(lista=>{
      lista.filter(element=>{
        if((element.estado=="confirmado" || element.estado=="a confirmar") && element.paciente.email.toLowerCase()==this.user.email.toLowerCase() && Number(Date.parse(element.fecha.toString()))>=Number(Date.parse(d.toString()))){
          j.push(element);
          
        }
      })
      let b=false
      j.forEach(ele=>{
        if(ele.estado=="confirmado"){
          b=true;
        }
      })
      
      this.turnosDelPaciente=j;
      this.turnosDelPaciente.sort((a,b) => Number(Date.parse(a.fecha.toString())) - Number(Date.parse(b.fecha.toString())));
      if(b){
        this.color="alert-info";
        this.mensaje="Usted tiene turnos confirmados los proximos quince días."; 
        this.mostrarT=true; 
      }
    if(this.turnosDelPaciente.length==0)
    this.hayTurnos=false;
    else
    this.hayTurnos=true;
    this.mostrar=true;
    })
    
  }

  cancelar(turno){
    this.turnosService.actualizarTurno(turno, 4);
    this.color="alert-warning";
    this.mensaje="El turno fue cancelado"; 
    this.mostrarT=true; 
  }
  

  cerrar(){    
    this.service.logOutUser();    
    this.router.navigate(['']);
  }

  cerrarPopup(mostrar2:boolean){
    this.mostrarT=mostrar2;
  }

}
