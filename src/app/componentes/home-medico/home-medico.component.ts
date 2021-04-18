import { Component, OnInit } from '@angular/core';
import { ServicioService } from 'src/app/servicios/servicio.service';
import { BdaService } from 'src/app/servicios/bda.service';
import { empleado } from 'src/app/clases/empleado';
import {TurnosHoraPipe} from '../../pipes/turnos-hora.pipe';
import { MedicosService } from 'src/app/servicios/medicos.service';
import { jornadaSemanal } from 'src/app/clases/jornadaSemanal';
import { Router } from '@angular/router';


@Component({
  selector: 'app-home-medico',
  templateUrl: './home-medico.component.html',
  styleUrls: ['./home-medico.component.css']
})
export class HomeMedicoComponent implements OnInit {

  medicoLogeado:empleado;
  
  user;

  mostrarT=false;
  mensaje:string;
  color:string;

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

  lunesEE:string;
  lunesES:string;

  martesEE:string;
  martesES:string;

  mierEE:string;
  mierES:string;

  jueEE:string;
  jueES:string;

  vieEE:string;
  vieES:string;

  saEE:string;
  saES:string;

  listaTurnosEntrada:number[];
  listaTurnosSalida:number[];
  listaTurnosEntradaSabado;
  listaTurnosSalidaSabado;

  jornadaActual:jornadaSemanal;
  hayJornada=false;

  constructor(private router:Router,private service:ServicioService, private bda:BdaService, private medicoService:MedicosService, private tpipe:TurnosHoraPipe) { 
    
    this.service.tomarUsuario().then(element=>{
      this.user=element;
      
      this.bda.devolverListadoEmpleados().subscribe(lista=>{
        lista.forEach(elementL=>{
          if(elementL.email.toLowerCase()==this.user.email.toLowerCase())
          {
          this.medicoLogeado=elementL;
          
          this.medicoService.devolverListadoJornadas().subscribe(listaJo=>{
            listaJo.filter(elementJo=>{
              if(elementJo.medico.email.toLowerCase()==this.user.email.toLowerCase()){
                this.jornadaActual=elementJo;              
                
                //lunes entrada
                if(elementJo.lunesE==0){
                  this.lunesEE="8:00";
                }else if(elementJo.lunesE==1){
                  this.lunesEE="9:00";
                }else if(elementJo.lunesE==2){
                  this.lunesEE="10:00";
                }else if(elementJo.lunesE==3){
                  this.lunesEE="11:00";
                }else if(elementJo.lunesE==4){
                  this.lunesEE="12:00";
                }else if(elementJo.lunesE==5){
                  this.lunesEE="13:00";
                }else if(elementJo.lunesE==6){
                  this.lunesEE="14:00";
                }else if(elementJo.lunesE==7){
                  this.lunesEE="15:00";
                }else if(elementJo.lunesE==8){
                  this.lunesEE="16:00";
                }else if(elementJo.lunesE==9){
                  this.lunesEE="17:00";
                }else if(elementJo.lunesE==10){
                  this.lunesEE="18:00";
                }else if(elementJo.lunesE==11){
                  this.lunesEE="19:00";
                }else{
                  this.lunesEE="Ausente";
                }

                //lunes salida
                if(elementJo.lunesS==0){
                  this.lunesES="8:00";
                }else if(elementJo.lunesS==1){
                  this.lunesES="9:00";
                }else if(elementJo.lunesS==2){
                  this.lunesES="10:00";
                }else if(elementJo.lunesS==3){
                  this.lunesES="11:00";
                }else if(elementJo.lunesS==4){
                  this.lunesES="12:00";
                }else if(elementJo.lunesS==5){
                  this.lunesES="13:00";
                }else if(elementJo.lunesS==6){
                  this.lunesES="14:00";
                }else if(elementJo.lunesS==7){
                  this.lunesES="15:00";
                }else if(elementJo.lunesS==8){
                  this.lunesES="16:00";
                }else if(elementJo.lunesS==9){
                  this.lunesES="17:00";
                }else if(elementJo.lunesS==10){
                  this.lunesES="18:00";
                }else if(elementJo.lunesS==11){
                  this.lunesES="19:00";
                }else{
                  this.lunesES="Ausente";
                }

                //martes entrada
                if(elementJo.martesE==0){
                  this.martesEE="8:00";
                }else if(elementJo.martesE==1){
                  this.martesEE="9:00";
                }else if(elementJo.martesE==2){
                  this.martesEE="10:00";
                }else if(elementJo.martesE==3){
                  this.martesEE="11:00";
                }else if(elementJo.martesE==4){
                  this.martesEE="12:00";
                }else if(elementJo.martesE==5){
                  this.martesEE="13:00";
                }else if(elementJo.martesE==6){
                  this.martesEE="14:00";
                }else if(elementJo.martesE==7){
                  this.martesEE="15:00";
                }else if(elementJo.martesE==8){
                  this.martesEE="16:00";
                }else if(elementJo.martesE==9){
                  this.martesEE="17:00";
                }else if(elementJo.martesE==10){
                  this.martesEE="18:00";
                }else if(elementJo.martesE==11){
                  this.martesEE="19:00";
                }else{
                  this.martesEE="Ausente";
                }

                 //martes salida
                 if(elementJo.martesS==0){
                  this.martesES="8:00";
                }else if(elementJo.martesS==1){
                  this.martesES="9:00";
                }else if(elementJo.martesS==2){
                  this.martesES="10:00";
                }else if(elementJo.martesS==3){
                  this.martesES="11:00";
                }else if(elementJo.martesS==4){
                  this.martesES="12:00";
                }else if(elementJo.martesS==5){
                  this.martesES="13:00";
                }else if(elementJo.martesS==6){
                  this.martesES="14:00";
                }else if(elementJo.martesS==7){
                  this.martesES="15:00";
                }else if(elementJo.martesS==8){
                  this.martesES="16:00";
                }else if(elementJo.martesS==9){
                  this.martesEE="17:00";
                }else if(elementJo.martesS==10){
                  this.martesES="18:00";
                }else if(elementJo.martesS==11){
                  this.martesES="19:00";
                }else{
                  this.martesES="Ausente";
                }

                //miercoles entrada
                if(elementJo.miercolesE==0){
                  this.mierEE="8:00";
                }else if(elementJo.miercolesE==1){
                  this.mierEE="9:00";
                }else if(elementJo.miercolesE==2){
                  this.mierEE="10:00";
                }else if(elementJo.miercolesE==3){
                  this.mierEE="11:00";
                }else if(elementJo.miercolesE==4){
                  this.mierEE="12:00";
                }else if(elementJo.miercolesE==5){
                  this.mierEE="13:00";
                }else if(elementJo.miercolesE==6){
                  this.mierEE="14:00";
                }else if(elementJo.miercolesE==7){
                  this.mierEE="15:00";
                }else if(elementJo.miercolesE==8){
                  this.mierEE="16:00";
                }else if(elementJo.miercolesE==9){
                  this.mierEE="17:00";
                }else if(elementJo.miercolesE==10){
                  this.mierEE="18:00";
                }else if(elementJo.miercolesE==11){
                  this.mierEE="19:00";
                }else{
                  this.mierEE="Ausente";
                }

                //miercoles salida
                if(elementJo.miercolesS==0){
                  this.mierES="8:00";
                }else if(elementJo.miercolesS==1){
                  this.mierES="9:00";
                }else if(elementJo.miercolesS==2){
                  this.mierES="10:00";
                }else if(elementJo.miercolesS==3){
                  this.mierES="11:00";
                }else if(elementJo.miercolesS==4){
                  this.mierES="12:00";
                }else if(elementJo.miercolesS==5){
                  this.mierES="13:00";
                }else if(elementJo.miercolesS==6){
                  this.mierES="14:00";
                }else if(elementJo.miercolesS==7){
                  this.mierES="15:00";
                }else if(elementJo.miercolesS==8){
                  this.mierES="16:00";
                }else if(elementJo.miercolesS==9){
                  this.mierES="17:00";
                }else if(elementJo.miercolesS==10){
                  this.mierES="18:00";
                }else if(elementJo.miercolesS==11){
                  this.mierES="19:00";
                }else{
                  this.mierES="Ausente";
                }

                //jueves entrada
                if(elementJo.juevesE==0){
                  this.jueEE="8:00";
                }else if(elementJo.juevesE==1){
                  this.jueEE="9:00";
                }else if(elementJo.juevesE==2){
                  this.jueEE="10:00";
                }else if(elementJo.juevesE==3){
                  this.jueEE="11:00";
                }else if(elementJo.juevesE==4){
                  this.jueEE="12:00";
                }else if(elementJo.juevesE==5){
                  this.jueEE="13:00";
                }else if(elementJo.juevesE==6){
                  this.jueEE="14:00";
                }else if(elementJo.juevesE==7){
                  this.jueEE="15:00";
                }else if(elementJo.juevesE==8){
                  this.jueEE="16:00";
                }else if(elementJo.juevesE==9){
                  this.jueEE="17:00";
                }else if(elementJo.juevesE==10){
                  this.jueEE="18:00";
                }else if(elementJo.juevesE==11){
                  this.jueEE="19:00";
                }else{
                  this.jueEE="Ausente";
                }

                //jueves salida
                if(elementJo.juevesS==0){
                  this.jueES="8:00";
                }else if(elementJo.juevesS==1){
                  this.jueES="9:00";
                }else if(elementJo.juevesS==2){
                  this.jueES="10:00";
                }else if(elementJo.juevesS==3){
                  this.jueES="11:00";
                }else if(elementJo.juevesS==4){
                  this.jueES="12:00";
                }else if(elementJo.juevesS==5){
                  this.jueES="13:00";
                }else if(elementJo.juevesS==6){
                  this.jueES="14:00";
                }else if(elementJo.juevesS==7){
                  this.jueES="15:00";
                }else if(elementJo.juevesS==8){
                  this.jueES="16:00";
                }else if(elementJo.juevesS==9){
                  this.jueES="17:00";
                }else if(elementJo.juevesS==10){
                  this.jueES="18:00";
                }else if(elementJo.juevesS==11){
                  this.jueES="19:00";
                }else{
                  this.jueES="Ausente";
                }

                //viernes entrada
                if(elementJo.viernesE==0){
                  this.vieEE="8:00";
                }else if(elementJo.viernesE==1){
                  this.vieEE="9:00";
                }else if(elementJo.viernesE==2){
                  this.vieEE="10:00";
                }else if(elementJo.viernesE==3){
                  this.vieEE="11:00";
                }else if(elementJo.viernesE==4){
                  this.vieEE="12:00";
                }else if(elementJo.viernesE==5){
                  this.vieEE="13:00";
                }else if(elementJo.viernesE==6){
                  this.vieEE="14:00";
                }else if(elementJo.viernesE==7){
                  this.vieEE="15:00";
                }else if(elementJo.viernesE==8){
                  this.vieEE="16:00";
                }else if(elementJo.viernesE==9){
                  this.vieEE="17:00";
                }else if(elementJo.viernesE==10){
                  this.vieEE="18:00";
                }else if(elementJo.viernesE==11){
                  this.vieEE="19:00";
                }else{
                  this.vieEE="Ausente";
                }

                //viernes salida
                if(elementJo.viernesS==0){
                  this.vieES="8:00";
                }else if(elementJo.viernesS==1){
                  this.vieES="9:00";
                }else if(elementJo.viernesS==2){
                  this.vieES="10:00";
                }else if(elementJo.viernesS==3){
                  this.vieES="11:00";
                }else if(elementJo.viernesS==4){
                  this.vieES="12:00";
                }else if(elementJo.viernesS==5){
                  this.vieES="13:00";
                }else if(elementJo.viernesS==6){
                  this.vieES="14:00";
                }else if(elementJo.viernesS==7){
                  this.vieES="15:00";
                }else if(elementJo.viernesS==8){
                  this.vieES="16:00";
                }else if(elementJo.viernesS==9){
                  this.vieES="17:00";
                }else if(elementJo.viernesS==10){
                  this.vieES="18:00";
                }else if(elementJo.viernesS==11){
                  this.vieES="19:00";
                }else{
                  this.vieES="Ausente";
                }

                //sabado entrada
                if(elementJo.SabadoE==0){
                  this.saEE="8:00";
                }else if(elementJo.SabadoE==1){
                  this.saEE="9:00";
                }else if(elementJo.SabadoE==2){
                  this.saEE="10:00";
                }else if(elementJo.SabadoE==3){
                  this.saEE="11:00";
                }else if(elementJo.SabadoE==4){
                  this.saEE="12:00";
                }else if(elementJo.SabadoE==5){
                  this.saEE="13:00";
                }else if(elementJo.SabadoE==6){
                  this.saEE="14:00";
                }else {
                  this.saEE="Ausente";
                }

                //sabado salida
                if(elementJo.sabadoS==0){
                  this.saES="8:00";
                }else if(elementJo.sabadoS==1){
                  this.saES="9:00";
                }else if(elementJo.sabadoS==2){
                  this.saES="10:00";
                }else if(elementJo.sabadoS==3){
                  this.saES="11:00";
                }else if(elementJo.sabadoS==4){
                  this.saES="12:00";
                }else if(elementJo.sabadoS==5){
                  this.saES="13:00";
                }else if(elementJo.sabadoS==6){
                  this.saES="14:00";
                }else {
                  this.saES="Ausente";
                }

                this.hayJornada=true;
                this.descargo=true;       

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
      this.color="alert-warning";
      this.mensaje="El turno de salida del lunes debe ser posterior al de entrada."; 
      this.mostrarT=true; 
     
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
      this.color="alert-warning";
      this.mensaje="El turno de salida del Martes debe ser posterior al de entrada."; 
      this.mostrarT=true; 
      
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
      this.color="alert-warning";
      this.mensaje="El turno de salida del miércoles debe ser posterior al de entrada."; 
      this.mostrarT=true; 
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
      this.color="alert-warning";
      this.mensaje="El turno de salida del jueves debe ser posterior al de entrada."; 
      this.mostrarT=true; 
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
      this.color="alert-warning";
      this.mensaje="El turno de salida del viernes debe ser posterior al de entrada."; 
      this.mostrarT=true; 
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
      this.color="alert-warning";
      this.mensaje="El turno de salida del sábado debe ser posterior al de entrada."; 
      this.mostrarT=true; 
      this.sePuedeSubir6=false;
    }
  }

  cerrarPopup(mostrar2:boolean){
    this.mostrarT=mostrar2;
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
        
        this.medicoLogeado.tieneJornada=true;
        this.bda.updateEmpleado(this.medicoLogeado);
        this.color="alert-info";
        this.mensaje="Sus horarios se han cargado correctamente"; 
        this.mostrarT=true; 
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
        
        this.color="alert-info";
      this.mensaje="Sus horarios se han cargado correctamente"; 
      this.mostrarT=true; 
      }else{
        this.color="alert-warning";
      this.mensaje="Los horarios ingresados no son validos"; 
      this.mostrarT=true; 
        
      }
        
    }
  

    
  }

  cerrar(){    
    this.service.logOutUser();    
    this.router.navigate(['']);
  }
  

}
