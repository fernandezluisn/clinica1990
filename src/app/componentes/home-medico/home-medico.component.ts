import { Component, OnInit } from '@angular/core';
import { ServicioService } from 'src/app/servicios/servicio.service';
import { BdaService } from 'src/app/servicios/bda.service';
import { empleado } from 'src/app/clases/empleado';
import {TurnosHoraPipe} from '../../pipes/turnos-hora.pipe';
import { MedicosService } from 'src/app/servicios/medicos.service';
import { jornadaSemanal } from 'src/app/clases/jornadaSemanal';
import { element } from 'protractor';

@Component({
  selector: 'app-home-medico',
  templateUrl: './home-medico.component.html',
  styleUrls: ['./home-medico.component.css']
})
export class HomeMedicoComponent implements OnInit {

  medicoLogeado:empleado;
  
  user;

  descargo=false;  

  nTurnoE1:number=0;
  nTurnoS1:number=11;
  nTurnoE2:number=0;
  nTurnoS2:number=11;
  nTurnoE3:number=0;
  nTurnoS3:number=11;
  nTurnoE4:number=0;
  nTurnoS4:number=11;
  nTurnoE5:number=0;
  nTurnoS5:number=11;
  nTurnoE6:number=0;
  nTurnoS6:number=11;
  ch1:boolean=false;
  ch2:boolean=false;
  ch3:boolean=false;
  ch4:boolean=false;
  ch5:boolean=false;
  ch6:boolean=false;
  
  sePuedeSubir1:boolean;
  sePuedeSubir2:boolean;
  sePuedeSubir3:boolean;
  sePuedeSubir4:boolean;
  sePuedeSubir5:boolean;
  sePuedeSubir6:boolean;

  jornada:jornadaSemanal;
  
  tiempoTurno;

  

  listaTurnosEntrada:number[];
  listaTurnosSalida:number[];
  listaTurnosEntradaSabado;
  listaTurnosSalidaSabado;

  jornadaActual:jornadaSemanal;
  hayJornada=false;

  constructor(private service:ServicioService, private bda:BdaService, private medicoService:MedicosService) { 
    
    this.service.tomarUsuario().then(element=>{
      this.user=element;
      
      this.bda.devolverListadoEmpleados().subscribe(lista=>{
        lista.forEach(elementL=>{
          if(elementL.email.toLowerCase()==this.user.email.toLowerCase())
          {
          console.log("El nombre es ",elementL.nombre);
          this.medicoLogeado=elementL;
          this.descargo=true;       
          
          this.medicoService.devolverListadoJornadas().subscribe(listaJo=>{
            listaJo.filter(elementJo=>{
              if(elementJo.medico.email.toLowerCase()==this.user.email.toLowerCase()){
                this.jornadaActual=elementJo;
                this.hayJornada=true;
              }
            })
          }
            );
          }
        })
      });

      
    });

    this.tiempoTurno=30;

    this.sePuedeSubir1=true;
    this.sePuedeSubir2=true;
    this.sePuedeSubir3=true;
    this.sePuedeSubir4=true;
    this.sePuedeSubir5=true;
    this.sePuedeSubir6=true;

    this.listaTurnosEntrada=new Array();
    for(let i=0; i<11; i++){
      this.listaTurnosEntrada.push(i);
    }
    this.listaTurnosSalida=new Array();
    for(let i=1; i<12; i++){
      this.listaTurnosSalida.push(i);
    }

    this.listaTurnosEntradaSabado=new Array();
    for(let i=0; i<7; i++){
      this.listaTurnosEntradaSabado.push(i);
    }

    this.listaTurnosSalidaSabado=new Array();
    for(let i=1; i<8; i++){
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
 
    

    if(this.hayJornada==false)
    {
      let j=new jornadaSemanal(this.ch1, this.ch2, this.ch3, this.ch4, this.ch5, this.ch6, this.medicoLogeado);
      
      if(this.ch1)
      {
        j.lunesE=this.nTurnoE1;
        j.lunesS=this.nTurnoS1;
      }

      if(this.ch2)
      {
        j.martesE=this.nTurnoE2;
        j.martesS=this.nTurnoS2;
      }
  
      if(this.ch3)
      {
        j.miercolesE=this.nTurnoE3;
        j.miercolesS=this.nTurnoS3;
      }
  
      if(this.ch4)
      {
        j.juevesE=this.nTurnoE4;
        j.juevesS=this.nTurnoS4;
      }
  
      if(this.ch5)
      {
        j.viernesE=this.nTurnoE5;
        j.viernesS=this.nTurnoS5;
      }
  
      if(this.ch6)
      {
        j.SabadoE=this.nTurnoE6;
        j.sabadoS=this.nTurnoS6;
      }

      j.tiempoTurnos=this.tiempoTurno;    

    
      this.medicoService.createHorario(j).then(res=>{
        alert("Sus horarios se han cargado correctamente");
      })
    }else{
      
      if(this.ch1)
    {
      this.jornadaActual.lunes=true;
      this.jornadaActual.lunesE=this.nTurnoE1;
      this.jornadaActual.lunesS=this.nTurnoS1;
    }

    if(this.ch2)
    {
      this.jornadaActual.martes=true;
      this.jornadaActual.martesE=this.nTurnoE2;
      this.jornadaActual.martesS=this.nTurnoS2;
    }

    if(this.ch3)
    {
      this.jornadaActual.miercoles=true;
      this.jornadaActual.miercolesE=this.nTurnoE3;
      this.jornadaActual.miercolesS=this.nTurnoS3;
    }

    if(this.ch4)
    {
      this.jornadaActual.jueves=true;
      this.jornadaActual.juevesE=this.nTurnoE4;
      this.jornadaActual.juevesS=this.nTurnoS4;
    }

    if(this.ch5)
    {
      this.jornadaActual.viernes=true;
      this.jornadaActual.viernesE=this.nTurnoE5;
      this.jornadaActual.viernesS=this.nTurnoS5;
    }

    if(this.ch6)
    {
      this.jornadaActual.sabado=true;
      this.jornadaActual.SabadoE=this.nTurnoE6;
      this.jornadaActual.sabadoS=this.nTurnoS6;
    }
      this.jornadaActual.tiempoTurnos=this.tiempoTurno; 
      if(this.sePuedeSubir1 && this.sePuedeSubir2 && this.sePuedeSubir3 && this.sePuedeSubir4 && this.sePuedeSubir5 && this.sePuedeSubir6){
        this.medicoService.updateJornada(this.jornadaActual);
        
        alert("Sus horarios se han cargado correctamente");
      }else{
        alert("Los horarios ingresados no son validos")
      }
        
    }
  

    
  }
  

}
