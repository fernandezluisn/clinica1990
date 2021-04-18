import { Component, OnInit } from '@angular/core';
import {ServicioService} from '../../servicios/servicio.service';
import {BdaService} from '../../servicios/bda.service';

import {TurnosPipe} from '../../pipes/turnos.pipe';
import {TurnosHoraPipe} from '../../pipes/turnos-hora.pipe';
import {FechaPipe} from '../../pipes/fecha.pipe';

import { TurnosService } from 'src/app/servicios/turnos.service';
import { turno } from 'src/app/clases/turno';
import { empleado } from 'src/app/clases/empleado';
import { DatePipe } from '@angular/common';
import { MedicosService } from 'src/app/servicios/medicos.service';
import { jornadaSemanal } from 'src/app/clases/jornadaSemanal';
import { Router } from '@angular/router';
import { especialidad } from 'src/app/clases/especialidad';


import {NgxSpinnerService} from 'ngx-spinner';



@Component({
  selector: 'app-turnos',
  templateUrl: './turnos.component.html',
  styleUrls: ['./turnos.component.css']
})
export class TurnosComponent implements OnInit {

  txtBuscar:string;

  usuario;
  usuarioLista;

  mostrar=false;
  mensaje:string;
  color:string;

  horaT:string; 

  fecha:Date;

  medicoDetalle:empleado=null;
 
  capt=true;

  hoy;
  
  etapa=0;
  esDomingo:boolean;
  nTurno:number;

  cargoU=false;
  
  especialidad:string;

  listadoPacientes;

  listadoEspecialistas:empleado[];
  listadoEspecialistasB:empleado[];

  captchaResuelto=false;

  nohayTurnosDia=false;

  dias1:string[];
  dias2:string[];
  jornada:jornadaSemanal;

  turnosHora=false;
  turnosMedia=false;  
  noHayJornada=false;
  
  
  listaHorariosTurnos;
  listaTurnosTomados;
  listaTurnosDia;
  listaTurnosDia2;
  listaTurnosDia3;
  listaJornadas:jornadaSemanal[];

  listadoEspecialidades:especialidad[];

  events: any[];

  options: any;

  constructor( private spin:NgxSpinnerService,private serv:ServicioService, private bda:BdaService, private turnosS:TurnosService, public datepipe: DatePipe, private medicoS:MedicosService, private router:Router) { 
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
      this.color="alert-warning";
          this.mensaje=err.message; 
          this.mostrar=true; 
    });

    this.esDomingo=false;
    this.hoy=new Date();
      
    this.generarDias();
  }

  ngOnInit(): void {  
  this.spinner();
    
  }

  spinner():void{
    this.spin.show();
    setTimeout(()=>{
      this.spin.hide();
    }, 5000)
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
            
            if(elementT.numeroTurno==elementF && elementT.fecha.toString()==this.datepipe.transform(this.fecha, "yyyy-MM-dd") && elementT.estado!="cancelado")
            {         
              
              let indice=this.listaTurnosDia.indexOf(elementF);
              this.listaTurnosDia.splice(indice, 1);
            }
          })
        }
         
          )
      }
    )

    if(this.listaTurnosDia.length>7){
      this.noHayJornada=false;
      if(this.listaTurnosDia.length>14){
        this.listaTurnosDia2=this.listaTurnosDia.splice(7,this.listaTurnosDia.length);
        this.listaTurnosDia3=this.listaTurnosDia2.splice(14,this.listaTurnosDia.length);
      }else{        
        this.listaTurnosDia2=this.listaTurnosDia.splice(7,this.listaTurnosDia.length);
        this.listaTurnosDia3=null;
      }
      
    }else if(this.listaTurnosDia.length==0){
      this.noHayJornada=true
    }else{
      this.noHayJornada=false;
      this.listaTurnosDia2=null;
    }
  }

  
  generarDias(){
       
    
    let dia1=new Date(this.hoy.getFullYear(), this.hoy.getMonth(), this.hoy.getDate()+0);
    let dia2=new Date(this.hoy.getFullYear(), this.hoy.getMonth(), this.hoy.getDate()+1);
    let dia3=new Date(this.hoy.getFullYear(), this.hoy.getMonth(), this.hoy.getDate()+2);
    let dia4=new Date(this.hoy.getFullYear(), this.hoy.getMonth(), this.hoy.getDate()+3);
    let dia5=new Date(this.hoy.getFullYear(), this.hoy.getMonth(), this.hoy.getDate()+4);
    let dia6=new Date(this.hoy.getFullYear(), this.hoy.getMonth(), this.hoy.getDate()+5);
    let dia7=new Date(this.hoy.getFullYear(), this.hoy.getMonth(), this.hoy.getDate()+6);
    let dia8=new Date(this.hoy.getFullYear(), this.hoy.getMonth(), this.hoy.getDate()+7);
    let dia9=new Date(this.hoy.getFullYear(), this.hoy.getMonth(), this.hoy.getDate()+8);
    let dia10=new Date(this.hoy.getFullYear(), this.hoy.getMonth(), this.hoy.getDate()+9);
    let dia11=new Date(this.hoy.getFullYear(), this.hoy.getMonth(), this.hoy.getDate()+10);
    let dia12=new Date(this.hoy.getFullYear(), this.hoy.getMonth(), this.hoy.getDate()+11);
    let dia13=new Date(this.hoy.getFullYear(), this.hoy.getMonth(), this.hoy.getDate()+12);
    let dia14=new Date(this.hoy.getFullYear(), this.hoy.getMonth(), this.hoy.getDate()+13);
    
    let dias1a=new Array(); 
    let dias2a=new Array(); 
    
    dias1a.push(dia1);
    dias1a.push(dia2);
    dias1a.push(dia3);
    dias1a.push(dia4);
    dias1a.push(dia5);
    dias1a.push(dia6);
    dias1a.push(dia7);
    
    dias2a.push(dia8);
    dias2a.push(dia9);
    dias2a.push(dia10);
    dias2a.push(dia11);
    dias2a.push(dia12);
    dias2a.push(dia13);
    dias2a.push(dia14);

    
    this.dias1=dias1a;
    this.dias2=dias2a;
  }
  

  mostrarFecha(){
    this.listaTurnosDia=new Array();   
    console.log(this.fecha.getDay());
     
    this.listaJornadas.filter(element=>{
      if(element.medico.email.toLowerCase()==this.medicoDetalle.email.toLowerCase())
      {
        this.jornada=element;
      }
    })


    if(this.jornada)
    {
      if(this.jornada.tiempoTurnos==30)
      {
  
  
        this.turnosHora=false;
        this.turnosMedia=true;        
        this.noHayJornada=false;
  
        switch(this.fecha.getDay()){
          case 0:            
            this.esDomingo=true;
          break;
          case 1:
            this.esDomingo=false;
            for(let n:number=(this.jornada.lunesE*2); n<(this.jornada.lunesS*2); n++)
            {
              this.listaTurnosDia.push(n);
            }
          break;
          case 2:
            this.esDomingo=false;
            for(let n=(this.jornada.martesE*2); n<(this.jornada.martesS*2); n++)
            {
              this.listaTurnosDia.push(n);
            }
          break;
          case 3:
            this.esDomingo=false;
            for(let n=(this.jornada.miercolesE*2); n<(this.jornada.miercolesS*2); n++)
            {
              this.listaTurnosDia.push(n);
            }
          break;
          case 4:
            this.esDomingo=false;
            for(let n=(this.jornada.juevesE*2); n<(this.jornada.juevesS*2); n++)
            {
              this.listaTurnosDia.push(n);
            }
          break;
          case 5:
            this.esDomingo=false;
            for(let n=(this.jornada.viernesE*2); n<(this.jornada.viernesS*2); n++)
            {
              this.listaTurnosDia.push(n);
            }
          break;
          case 6:
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
        this.noHayJornada=false;
  
  
        switch(this.fecha.getDay()){
          case 0:            
            this.esDomingo=true;
          break;
          case 1:
            this.esDomingo=false;
            for(let n=this.jornada.lunesE*1; n<this.jornada.lunesS; n++)
            {
              this.listaTurnosDia.push(n);
            }
          break;
          case 2:
            this.esDomingo=false;
            for(let n=this.jornada.martesE*1; n<this.jornada.martesS; n++)
            {
              this.listaTurnosDia.push(n);
            }
          break;
          case 3:
            this.esDomingo=false;
            for(let n=this.jornada.miercolesE*1; n<this.jornada.miercolesS; n++)
            {
              this.listaTurnosDia.push(n);
            }
          break;
          case 4:
            this.esDomingo=false;
            for(let n=this.jornada.juevesE*1; n<this.jornada.juevesS; n++)
            {
              this.listaTurnosDia.push(n);
            }
          break;
          case 5:
            this.esDomingo=false;
            for(let n=this.jornada.viernesE*1; n<this.jornada.viernesS; n++)
            {
              this.listaTurnosDia.push(n);
            }
          break;
          case 6:
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
        this.noHayJornada=true;
    }
    
    this.etapa=1;
    
  }

  atras(){
    this.etapa=this.etapa-1;
  }

  pasarPantalla0(medico){
    this.medicoDetalle=medico;
    this.etapa=1;    
    this.especialidad=null;
  }

  pasarPantalla1(esp:string){
    this.especialidad=esp;
    console.log(esp);   
    

    
    
    this.etapa=2;   
  }

  pasarPantalla2(dia:string){
    this.fecha=new Date(dia);
    console.log(this.fecha);
    this.mostrarFecha();
    this.etapa=3;
  }

  mostrarHora(nTurno:number){
    this.nTurno=nTurno;
        

    let hora:string;
    
    if(this.jornada.tiempoTurnos.toString()=="60"){
      if(this.nTurno==0){
        hora="8:00";
      }else if(this.nTurno==1){
        hora="9:00";
      }else if(this.nTurno==2){
        hora="10:00";
      }else if(this.nTurno==3){
        hora="11:00";
      }else if(this.nTurno==4){
        hora="12:00";
      }else if(this.nTurno==5){
        hora="13:00";
      }else if(this.nTurno==6){
        hora="14:00";
      }else if(this.nTurno==7){
        hora="15:00";
      }else if(this.nTurno==8){
        hora="16:00";
      }else if(this.nTurno==9){
        hora="17:00";
      }else if(this.nTurno==10){
        hora="18:00";
      }else if(this.nTurno==11){
        hora="19:00";
      }
      
    }else{
      if(this.nTurno==0){
        hora="8:00";
      }else if(this.nTurno==1){
        hora="8:30";
      }else if(this.nTurno==2){
        hora="9:00";
      }else if(this.nTurno==3){
        hora="9:30";
      }else if(this.nTurno==4){
        hora="10:00";
      }else if(this.nTurno==5){
        hora="10:30";
      }else if(this.nTurno==6){
        hora="11:00";
      }else if(this.nTurno==7){
        hora="11:30";
      }else if(this.nTurno==8){
        hora="12:00";
      }else if(this.nTurno==9){
        hora="12:30";
      }else if(this.nTurno==10){
        hora="13:00";
      }else if(this.nTurno==11){
        hora="13:30";
      }else if(this.nTurno==12){
        hora="14:00";
      }else if(this.nTurno==13){
        hora="14:30";
      }else if(this.nTurno==14){
        hora="15:00";
      }else if(this.nTurno==15){
        hora="15:30";
      }else if(this.nTurno==16){
        hora="16:00";
      }else if(this.nTurno==17){
        hora="16:30";
      }else if(this.nTurno==18){
        hora="17:00";
      }else if(this.nTurno==19){
        hora="17:30";
      }else if(this.nTurno==20){
        hora="18:00";
      }else if(this.nTurno==21){
        hora="18:30";
      }else if(this.nTurno==22){
        hora="19:00";
      }        
      
    }
    this.horaT=hora;
    
    this.etapa=4;
  }

  
  

  subirTurno(){     
      
      let esp:especialidad;

      this.listadoEspecialidades.forEach(element=>{
        if(this.especialidad==element.nombre){
          esp=element;
        }
      })

      esp.operaciones++;

      this.bda.updateEspecialidad(esp);

     
      
      
      let t=new turno(this.medicoDetalle, this.usuarioLista, "a confirmar", this.datepipe.transform(this.fecha, "yyyy-MM-dd"), this.nTurno, "No hay", this.especialidad, this.horaT);      
      console.log(t);
      this.turnosS.createTurno(t).then(res=>{
                        
        this.router.navigate(["turnosAprobados"]);
      });    
     
  }

  cerrar(){    
    this.serv.logOutUser();    
    this.router.navigate(['']);
  }

  cerrarPopup(mostrar2:boolean){
    this.mostrar=mostrar2;
  }
 

}
