import { Component, OnInit } from '@angular/core';
import { ServicioService } from 'src/app/servicios/servicio.service';
import { BdaService } from 'src/app/servicios/bda.service';
import { empleado } from 'src/app/clases/empleado';
import {TurnosHoraPipe} from '../../pipes/turnos-hora.pipe';

@Component({
  selector: 'app-home-medico',
  templateUrl: './home-medico.component.html',
  styleUrls: ['./home-medico.component.css']
})
export class HomeMedicoComponent implements OnInit {

  medicoLogeado:empleado;
  user;

  descargo:boolean;
  nTurnoE1:number;
  nTurnoS1:number;
  nTurnoE2:number;
  nTurnoS2:number;
  nTurnoE3:number;
  nTurnoS3:number;
  nTurnoE4:number;
  nTurnoS4:number;
  nTurnoE5:number;
  nTurnoS5:number;
  nTurnoE6:number;
  nTurnoS6:number;
  ch1:boolean;
  ch2:boolean;
  ch3:boolean;
  ch4:boolean;
  ch5:boolean;
  ch6:boolean;
  
  sePuedeSubir1:boolean;
  sePuedeSubir2:boolean;
  sePuedeSubir3:boolean;
  sePuedeSubir4:boolean;
  sePuedeSubir5:boolean;
  sePuedeSubir6:boolean;


  
  tiempoTurno;

  listaTurnosEntrada:number[];
  listaTurnosSalida:number[];
  listaTurnosEntradaSabado;
  listaTurnosSalidaSabado;

  constructor(private service:ServicioService, private bda:BdaService) { 
    this.service.tomarUsuario().then(element=>{
      this.user=element;
      
      this.bda.devolverListadoEmpleados().subscribe(lista=>{
        lista.forEach(elementL=>{
          if(elementL.email.toLowerCase()==this.user.email.toLowerCase())
          this.medicoLogeado=elementL;
          this.descargo=true;
        })
      });
    });

    this.tiempoTurno="30 minutos";

    this.sePuedeSubir1=true;
    this.sePuedeSubir2=true;
    this.sePuedeSubir3=true;
    this.sePuedeSubir4=true;
    this.sePuedeSubir5=true;
    this.sePuedeSubir6=true;

    this.listaTurnosEntrada=new Array();
    for(let i=1; i<11; i++){
      this.listaTurnosEntrada.push(i);
    }
    this.listaTurnosSalida=new Array();
    for(let i=2; i<12; i++){
      this.listaTurnosSalida.push(i);
    }

    this.listaTurnosEntradaSabado=new Array();
    for(let i=1; i<7; i++){
      this.listaTurnosEntradaSabado.push(i);
    }

    this.listaTurnosSalidaSabado=new Array();
    for(let i=2; i<8; i++){
      this.listaTurnosSalidaSabado.push(i);
    }
    
  }

  ngOnInit(): void {
  }

  checkbox1(){
    if(this.ch1==false)
    this.ch1=true;
    else
    this.ch1=false;

    if(this.nTurnoE1<this.nTurnoS1)
    {
      this.sePuedeSubir1=true;
    }
    else{
      this.sePuedeSubir1=false;
      alert("El turno de salida del lunes debe ser posterior al de entrada.");
    }
  }

  checkbox2(){
    if(this.ch2==false)
    this.ch2=true;
    else
    this.ch2=false;

    if(this.nTurnoE2<this.nTurnoS2)
    {
      this.sePuedeSubir2=true;
    }
    else{
      this.sePuedeSubir2=false;
      alert("El turno de salida del martes debe ser posterior al de entrada.");
    }
  }

  checkbox3(){
    if(this.ch3==false)
    this.ch3=true;
    else
    this.ch3=false;

    if(this.nTurnoE3<this.nTurnoS3)
    {
      
      this.sePuedeSubir3=true;
    }
    else{
      this.sePuedeSubir3=false;
      alert("El turno de salida del miércoles debe ser posterior al de entrada.");
    }
  }

  checkbox4(){
    if(this.ch4==false)
    this.ch4=true;
    else
    this.ch4=false;

    if(this.nTurnoE4<this.nTurnoS4)
    {
      this.sePuedeSubir4=true;
    }
    else{
      this.sePuedeSubir4=false;
      alert("El turno de salida del Jueves debe ser posterior al de entrada.");
    }
  }

  checkbox5(){
    if(this.ch5==false)
    this.ch5=true;
    else
    this.ch5=false;

    if(this.nTurnoE5<this.nTurnoS5)
    {
      this.sePuedeSubir5=true;
    }
    else{
      this.sePuedeSubir5=false;
      alert("El turno de salida del viernes debe ser posterior al de entrada.");
    }
  }

  checkbox6(){
    if(this.ch6==false)
    this.ch6=true;
    else
    this.ch6=false;

    if(this.nTurnoE6<this.nTurnoS6)
    {
      this.sePuedeSubir6=true;
    }
    else{
      alert("El turno de salida del sábado debe ser posterior al de entrada.");
      this.sePuedeSubir6=false;
    }
  }

  subirHorarios(){

  }
  

}
