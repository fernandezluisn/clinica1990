import { Component, OnInit } from '@angular/core';
import { TurnosService } from 'src/app/servicios/turnos.service';
import { turno } from 'src/app/clases/turno';
import { ServicioService } from 'src/app/servicios/servicio.service';
import { NgxSpinnerService } from 'ngx-spinner';
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
  mostrar:boolean=false;;

  constructor(private ngx:NgxSpinnerService,private turnosService:TurnosService, private service:ServicioService, private router:Router) { 
    this.turnosDelPaciente=new Array();
    this.spinner();
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
      this.turnosDelPaciente=j;
      this.turnosDelPaciente.sort((a,b) => Number(Date.parse(a.fecha.toString())) - Number(Date.parse(b.fecha.toString())));
      if(this.turnosDelPaciente.length==0)
    this.hayTurnos=false;
    else
    this.hayTurnos=true;
    this.mostrar=true;
    })
    
  }

  cancelar(turno){
    this.turnosService.actualizarTurno(turno, 4);
    alert("El turno se ha cancelado");
  }

  spinner(){
    if(this.mostrar==false)
    {
      this.ngx.show();
      setTimeout(()=>{
        this.ngx.hide();
      }, 2000)
    }
    
  }

  cerrar(){    
    this.service.logOutUser();    
    this.router.navigate(['']);
  }

}
