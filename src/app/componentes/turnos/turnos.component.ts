import { Component, OnInit } from '@angular/core';
import {ServicioService} from '../../servicios/servicio.service';
import {BdaService} from '../../servicios/bda.service';

import {TurnosPipe} from '../../pipes/turnos.pipe';
import {TurnosHoraPipe} from '../../pipes/turnos-hora.pipe';

import { TurnosService } from 'src/app/servicios/turnos.service';
import { turno } from 'src/app/clases/turno';
import { empleado } from 'src/app/clases/empleado';
import { isNull } from 'util';
import { DatePipe } from '@angular/common';
import { MedicosService } from 'src/app/servicios/medicos.service';
import { jornadaSemanal } from 'src/app/clases/jornadaSemanal';
import {Mailer} from '../../clases/mailer';
import { Router } from '@angular/router';
import { especialidad } from 'src/app/clases/especialidad';





@Component({
  selector: 'app-turnos',
  templateUrl: './turnos.component.html',
  styleUrls: ['./turnos.component.css']
})
export class TurnosComponent implements OnInit {

  txtBuscar:string;

  usuario;
  usuarioLista;

  hayTurno=false;

  fecha:Date;

  medicoDetalle:empleado=null;
 
  capt=true;

  hoy;
  quinceDias;
  v0:boolean;
  v1:boolean;
  v2:boolean;
  v3:boolean;
  esDomingo:boolean;
  nTurno:number;

  cargoU=false;
  
  especialidad:string;

  listadoPacientes;

  listadoEspecialistas:empleado[];
  listadoEspecialistasB:empleado[];

  captchaResuelto=false;

  nohayTurnosDia=false;

  jornada:jornadaSemanal;

  turnosHora=false;
  turnosMedia=false;
  turnosCuarenta=false;
  noHayJornada=false;
  
  
  listaHorariosTurnos;
  listaTurnosTomados;
  listaTurnosDia;
  listaJornadas:jornadaSemanal[];

  listadoEspecialidades:especialidad[];

  events: any[];
  mailer:Mailer;

  options: any;

  constructor( private serv:ServicioService, private bda:BdaService, private turnosS:TurnosService, public datepipe: DatePipe, private medicoS:MedicosService, private router:Router) { 
    this.nTurno=null;

    this.bda.devolverListadoEspecialidades().subscribe(lista=>{
      this.listadoEspecialidades=lista;
    });
    
    this.serv.tomarUsuario().then(res=>{
      
      this.usuario=res;   

      let j=new Array();
      this.bda.devolverListadoEmpleados().subscribe(lista=>{
        
        lista.filter(element=>{
          if(element.aprobadoPorAdmin==true)
          {
            j.push(element);
          }
        })
        this.listadoEspecialistas=j;
        this.listadoEspecialistasB=this.listadoEspecialistas;
      });

      this.medicoS.devolverListadoJornadas().subscribe(listaM=>{
        this.listaJornadas=listaM;
      })
      
      this.bda.devolverListadoPacientes().subscribe(lista=>{
        lista.forEach(element=>{
          if(element.email.toLowerCase()==this.usuario.email.toLowerCase())
          this.usuarioLista=element;
          this.cargoU=true;
        })

      })
     
    }).catch(err=>{
      alert(err);
    });

    this.esDomingo=false;
    this.hoy=new Date();
    this.quinceDias=new Date(this.hoy.getFullYear(), this.hoy.getMonth(), this.hoy.getDate()+15);
   
    this.v0=false;
    this.v1=false;
    this.v2=false;
    this.v3=false;
  }

  ngOnInit(): void {  
  
    
  }

  respuesta(a:boolean){
    this.captchaResuelto=a;
    if(a==true){
      this.capt=false;
    }
  }

  filtrarPorDia(lista:empleado[], str:string){

    let s0="lunes";
    let s1="martes";
    let s2="miercoles";
    let s3="jueves";
    let s4="viernes";
    let s5="sabado";

    let listM:empleado[]=new Array();
    
    

    if(s0.includes(str.toLowerCase()))
    {
      lista.filter(element=>{
        this.listaJornadas.filter(elementJ=>{
          if(element.email.toLowerCase()==elementJ.medico.email.toLowerCase()){
            if(elementJ.lunes==true){
              listM.push(element);
            }
          }
        })
        
      })
    }else if(s1.includes(str.toLowerCase())){
      lista.filter(element=>{
        this.listaJornadas.filter(elementJ=>{
          if(element.email.toLowerCase()==elementJ.medico.email.toLowerCase()){
            if(elementJ.martes==true){
              listM.push(element);
            }
          }
        })
        
        })
    }else if(s2.includes(str.toLowerCase())){
      lista.filter(element=>{
        this.listaJornadas.filter(elementJ=>{
          if(element.email.toLowerCase()==elementJ.medico.email.toLowerCase()){
            if(elementJ.miercoles==true){
              listM.push(element);
            }
          }
        })
        
      })
    }else if(s3.includes(str.toLowerCase())){
      lista.filter(element=>{
        this.listaJornadas.filter(elementJ=>{
          if(element.email.toLowerCase()==elementJ.medico.email.toLowerCase()){
            if(elementJ.jueves==true){
              listM.push(element);
            }
          }
        })
        
      })
    }else if(s4.includes(str.toLowerCase())){
      lista.filter(element=>{
        this.listaJornadas.filter(elementJ=>{
          if(element.email.toLowerCase()==elementJ.medico.email.toLowerCase()){
            if(elementJ.viernes==true){
              listM.push(element);
            }
          }
        })
        
      })
    }else if(s5.includes(str.toLowerCase())){
      lista.filter(element=>{
        this.listaJornadas.filter(elementJ=>{
          if(element.email.toLowerCase()==elementJ.medico.email.toLowerCase()){
            if(elementJ.sabado==true){
              listM.push(element);
            }
          }
        })
        
      })
    }
    return listM;
  }

  filtrarLista(){
    let j=new Array();   
   


    this.listadoEspecialistas.filter(element=>{



      if(element.apellido.toLowerCase().includes(this.txtBuscar.toLowerCase()) || element.nombre.toLowerCase().includes(this.txtBuscar.toLowerCase())){
        j.push(element);
      }else{
        element.especialidades.filter(elementB=>{
          if (elementB.toLowerCase().includes(this.txtBuscar.toLowerCase())){
            j.push(element);
          }
        })
      }
    })
    let j2=this.filtrarPorDia(this.listadoEspecialistas, this.txtBuscar);

    j.filter(elementj=>{
      j2.forEach(elementj2=>{
        if(elementj.email.toLowerCase()==elementj2.email.toLowerCase()){
          let indice=j2.indexOf(elementj2);
              j2.splice(indice, 1);
        }
      })
      
    })

    this.listadoEspecialistasB=j2.concat(j);
  }

  filtrarListaTurnosDia(){  
    
    this.nTurno=null;
    this.turnosS.devolverListadoTurnos().subscribe(
      lista=>{
        
        lista.forEach(elementT=>{
          
          this.listaTurnosDia.forEach(elementF => {
            
            if(elementT.numeroTurno==elementF && elementT.fecha.toString()==this.fecha.toString() && elementT.estado!="cancelado")
            {             
              let indice=this.listaTurnosDia.indexOf(elementF);
              this.listaTurnosDia.splice(indice, 1);
            }
          })
        }
         
          )
      }
    )

    if(this.listaTurnosDia.length==0){
    this.noHayJornada=true
    }else{
      this.noHayJornada=false;
    }
  }

  

  mostrarBoton(){
    if(this.v1==true && this.v2==true && !this.esDomingo){
      this.v3=true;
    }
  }

  mostrarFecha(){
    this.listaTurnosDia=new Array();
    
    let d=new Date(this.fecha);
     
    this.listaJornadas.filter(element=>{
      if(element.medico.email.toLowerCase()==this.medicoDetalle.email.toLowerCase())
      {
        this.jornada=element;
      }
    })
    if(!isNull(this.jornada))
    {
      if(this.jornada.tiempoTurnos==30)
      {
  
  
        this.turnosHora=false;
        this.turnosMedia=true;
        this.turnosCuarenta=false;
        this.noHayJornada=false;
  
        switch(d.getDay()){
          case 6:
            this.esDomingo=true;
          break;
          case 0:
            this.esDomingo=false;
            for(let n:number=(this.jornada.lunesE*2); n<(this.jornada.lunesS*2); n++)
            {
              this.listaTurnosDia.push(n);
            }
          break;
          case 1:
            this.esDomingo=false;
            for(let n=(this.jornada.martesE*2); n<(this.jornada.martesS*2); n++)
            {
              this.listaTurnosDia.push(n);
            }
          break;
          case 2:
            this.esDomingo=false;
            for(let n=(this.jornada.miercolesE*2); n<(this.jornada.miercolesS*2); n++)
            {
              this.listaTurnosDia.push(n);
            }
          break;
          case 3:
            this.esDomingo=false;
            for(let n=(this.jornada.juevesE*2); n<(this.jornada.juevesS*2); n++)
            {
              this.listaTurnosDia.push(n);
            }
          break;
          case 4:
            this.esDomingo=false;
            for(let n=(this.jornada.viernesE*2); n<(this.jornada.viernesS*2); n++)
            {
              this.listaTurnosDia.push(n);
            }
          break;
          case 5:
            this.esDomingo=false;
            for(let n=(this.jornada.SabadoE*2); n<(this.jornada.sabadoS*2); n++)
            {
              this.listaTurnosDia.push(n);
            }
          break;
        }

        
      }else{
  
        this.turnosHora=true;
        this.turnosMedia=false;
        this.turnosCuarenta=false;
        this.noHayJornada=false;
  
  
        switch(d.getDay()){
          case 6:
            this.esDomingo=true;
          break;
          case 0:
            this.esDomingo=false;
            for(let n=this.jornada.lunesE*1; n<this.jornada.lunesS; n++)
            {
              this.listaTurnosDia.push(n);
            }
          break;
          case 1:
            this.esDomingo=false;
            for(let n=this.jornada.martesE*1; n<this.jornada.martesS; n++)
            {
              this.listaTurnosDia.push(n);
            }
          break;
          case 2:
            this.esDomingo=false;
            for(let n=this.jornada.miercolesE*1; n<this.jornada.miercolesS; n++)
            {
              this.listaTurnosDia.push(n);
            }
          break;
          case 3:
            this.esDomingo=false;
            for(let n=this.jornada.juevesE*1; n<this.jornada.juevesS; n++)
            {
              this.listaTurnosDia.push(n);
            }
          break;
          case 4:
            this.esDomingo=false;
            for(let n=this.jornada.viernesE*1; n<this.jornada.viernesS; n++)
            {
              this.listaTurnosDia.push(n);
            }
          break;
          case 5:
            this.esDomingo=false;
            for(let n=this.jornada.SabadoE*1; n<this.jornada.sabadoS; n++)
            {
              this.listaTurnosDia.push(n);
            }
          break;
        }
      }
    
      this.filtrarListaTurnosDia();
    }else{
      this.turnosHora=false;
        this.turnosMedia=false;
        this.turnosCuarenta=false;
        this.noHayJornada=true;
    }
    
    this.v1=true;
    
  }

  mostrarHora(){
    this.v2=true;
    this.mostrarBoton();
    if(!isNull(this.medicoDetalle))
    this.hayTurno=true;
  }

  tomarMedico(medico){
    this.medicoDetalle=medico;
    this.v0=true;
    this.mostrarFecha();
    this.especialidad=null;
  }

  mostrarEspecialidad(){
    this.especialidad;
  }

  subirTurno(){
    if(this.captchaResuelto==false)
    {
      alert("debe resolver el captcha");
    }else

    if(isNull(this.medicoDetalle))
    {
      alert("Debe seleccionar un médico presionando sobre la tabla.");
    }else if(isNull(this.nTurno)){
      alert("No es posible reservar turno este día");
      
    }else if(isNull(this.especialidad)){
      alert("Debe seleccionar especialidad");
      
    }else{

      let esp:especialidad;

      this.listadoEspecialidades.forEach(element=>{
        if(this.especialidad==element.nombre){
          esp=element;
        }
      })

      esp.operaciones++;

      this.bda.updateEspecialidad(esp);
      
      let t=new turno(this.medicoDetalle, this.usuarioLista, "a confirmar", this.fecha, this.nTurno, "No hay", this.especialidad);      
      this.turnosS.createTurno(t).then(res=>{
        alert("Su turno se ha registrado correctamente.");        
        this.router.navigate(["turnosAprobados"]);
      });


    }
     // this.mailer.sendMail("aaa");
  }
 

}
