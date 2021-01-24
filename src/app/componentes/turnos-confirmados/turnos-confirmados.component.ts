import { Component, OnInit } from '@angular/core';
import { ServicioService } from 'src/app/servicios/servicio.service';
import { BdaService } from 'src/app/servicios/bda.service';
import { TurnosService } from 'src/app/servicios/turnos.service';
import { turno } from 'src/app/clases/turno';
import { DatePipe } from '@angular/common'
import { Mailer } from 'src/app/clases/mailer';
import { Router } from '@angular/router';

@Component({
  selector: 'app-turnos-confirmados',
  templateUrl: './turnos-confirmados.component.html',
  styleUrls: ['./turnos-confirmados.component.css']
})
export class TurnosConfirmadosComponent implements OnInit {

  user;
  listaTurnosC:turno[];
  medicoLogeado;
  descargo:boolean;
  noHayTurnos=false;
  

  constructor(private service:ServicioService, private bda:BdaService, private turnosBDA:TurnosService, public datepipe:DatePipe, private router:Router) {
    this.service.tomarUsuario().then(element=>
      {
        this.user=element;
        this.filtrarTurnos();
          this.bda.devolverListadoEmpleados().subscribe(lista=>{
            lista.forEach(elementL=>{
              if(elementL.email.toLowerCase()==this.user.email.toLowerCase())
              this.medicoLogeado=elementL;
              this.descargo=true;
          });
        })
      }
      );
   }

  ngOnInit(): void {
  }

  cerrar(){    
    this.service.logOutUser();    
    this.router.navigate(['']);
  }

  filtrarTurnos(){
    let j=new Array();
    
    this.turnosBDA.devolverListadoTurnos().subscribe(lista=>{
      lista.filter(element=>{
        if(element.estado=="confirmado" && element.empleado.email==this.user.email)
        j.push(element);
      })

      this.listaTurnosC=j;
      this.ordenarTabla();

     
      
  })};

  cancelar(turno:turno){
    this.turnosBDA.actualizarTurno(turno, 4);
    this.filtrarTurnos();
    alert("El turno se ha cancelado y se le informará al paciente.");
  }

  ordenarTabla(){
    
    this.listaTurnosC.sort((a,b) => Number(Date.parse(a.fecha.toString())) - Number(Date.parse(b.fecha.toString())));
    

    if(this.listaTurnosC.length==0)
    this.noHayTurnos=true;
    else
    this.noHayTurnos=false;
  }

}
