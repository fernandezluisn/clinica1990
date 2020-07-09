import { Component, OnInit } from '@angular/core';
import {ServicioService} from '../../servicios/servicio.service';
import {BdaService} from '../../servicios/bda.service';
import {TurnosPipe} from '../../pipes/turnos.pipe';
import { TurnosService } from 'src/app/servicios/turnos.service';
import { turno } from 'src/app/clases/turno';
import { empleado } from 'src/app/clases/empleado';
import { isNull } from 'util';
import { element } from 'protractor';





@Component({
  selector: 'app-turnos',
  templateUrl: './turnos.component.html',
  styleUrls: ['./turnos.component.css']
})
export class TurnosComponent implements OnInit {

  usuario;
  usuarioLista;

  hayTurno=false;

  fecha:Date;

  medicoDetalle:empleado=null;
 

  hoy;
  quinceDias;
  v0:boolean;
  v1:boolean;
  v2:boolean;
  v3:boolean;
  esDomingo:boolean;
  nTurno:number;
  
  listadoPacientes;

  listadoEspecialistas;
  
  //hacer
  listaHorariosTurnos;
  listaTurnosTomados;
  listaTurnosDia;

  events: any[];

  options: any;

  constructor( private serv:ServicioService, private bda:BdaService, private turnosS:TurnosService) { 
    this.serv.tomarUsuario().then(res=>{
      
      this.usuario=res;   

      this.bda.devolverListadoEmpleados().subscribe(lista=>{
        this.listadoEspecialistas=lista;
      });
      
      this.bda.devolverListadoPacientes().subscribe(lista=>{
        lista.forEach(element=>{
          if(element.email.toLowerCase()==this.usuario.email.toLowerCase())
          this.usuarioLista=element;
          
        })

      })
      console.log(this.usuario.uid);   
    }).catch(err=>{
      alert(err);
    });

    this.esDomingo=false;
    this.hoy=new Date();
    this.quinceDias=new Date(this.hoy.getFullYear(), this.hoy.getMonth(), this.hoy.getDate()+15);
    console.log(this.quinceDias);
    this.v0=false;
    this.v1=false;
    this.v2=false;
    this.v3=false;
  }

  ngOnInit(): void {  
  
    
  }

  filtrarListaTurnosDia(){
    this.turnosS.turnosFiltradosPorFechaYEmpleado(this.medicoDetalle.email, this.fecha.toString()).subscribe(
      lista=>{
        
        lista.forEach(elementT=>{
          
          this.listaTurnosDia.forEach(elementF => {
            
            if(elementT.numeroTurno==elementF)
            {
             
              let indice=this.listaTurnosDia.indexOf(elementF);
              this.listaTurnosDia.splice(indice, 1);
            }
          })
        }
         
          )
      }
    )
  }

  mostrarBoton(){
    if(this.v1==true && this.v2==true && !this.esDomingo){
      this.v3=true;
    }
  }

  mostrarFecha(){
    this.listaTurnosDia=new Array();
    
    let d=new Date(this.fecha);
   
    switch(d.getDay()){
      case 0:
        this.esDomingo=true;
      break;
      case 1:
        this.esDomingo=false;
        for(let n=0; n<23; n++)
        {
          this.listaTurnosDia.push(n);
        }
      break;
      case 2:
        this.esDomingo=false;
        for(let n=0; n<23; n++)
        {
          this.listaTurnosDia.push(n);
        }
      break;
      case 3:
        this.esDomingo=false;
        for(let n=0; n<23; n++)
        {
          this.listaTurnosDia.push(n);
        }
      break;
      case 4:
        this.esDomingo=false;
        for(let n=0; n<23; n++)
        {
          this.listaTurnosDia.push(n);
        }
      break;
      case 5:
        this.esDomingo=false;
        for(let n=0; n<23; n++)
        {
          this.listaTurnosDia.push(n);
        }
      break;
      case 6:
        this.esDomingo=false;
        for(let n=0; n<13; n++)
        {
          this.listaTurnosDia.push(n);
        }
      break;
    }
    this.filtrarListaTurnosDia();
    this.v1=true;
    
  }

  mostrarHora(){
    console.log(this.nTurno);
    this.v2=true;
    this.mostrarBoton();
    if(!isNull(this.medicoDetalle))
    this.hayTurno=true;
  }

  tomarMedico(medico){
    this.medicoDetalle=medico;
    console.log(this.medicoDetalle.id);
    this.v0=true;
  }

  subirTurno(){
    if(isNull(this.medicoDetalle))
    {
      alert("Debe seleccionar un médico presionando sobre la tabla.");
    }else{
      let t=new turno(this.medicoDetalle, this.usuarioLista, "a confirmar", this.fecha, this.nTurno);
      let s=this.fecha.toString()+this.medicoDetalle.email;
      this.turnosS.createTurno(t, s).then(res=>{
        alert("Su turno se ha registrado correctamente.");
        this.turnosS.createTurno(t, "turnosEmpleado"+this.medicoDetalle.email);
        this.turnosS.createTurno(t, "turnosPaciente"+this.usuario.email);
        
      });

      
    }
      
  }
 

}
