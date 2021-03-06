import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import { encuesta } from 'src/app/clases/encuesta';
import { TurnosService } from 'src/app/servicios/turnos.service';
import { turno } from 'src/app/clases/turno';


@Component({
  selector: 'app-encuesta',
  templateUrl: './encuesta.component.html',
  styleUrls: ['./encuesta.component.css']
})
export class EncuestaComponent implements OnInit {

  condicionesPaciente:string[]=["Buena","Regular","Mala"];;
  infraestructuraHospital:string[]=["Buena","Regular","Mala"];
  insumosHospital:string[]=["Suficiente","Regular","Insuficiente"];

  condicionesPacienteR:string;
  infraestructuraHospitalR:string;
  insumosHospitalR:string;

  
  turno:turno;

  v1=false;
  v2=false;
  v3=false;

  turnoEncuestado;

  id:string;

  cargo=false;
  hayEncu=false;

  mostrar=false;
  mensaje="";
  color:string;

  constructor(private router: Router, private tomarId:ActivatedRoute, private turnosS:TurnosService) { 
    this.id=this.tomarId.snapshot.paramMap.get('idTurno');
    
    this.turnosS.devolverListadoEncuestas().subscribe(lista=>{
      lista.filter(element=>{
        if(element.idTurno==this.id){
          this.hayEncu=true;
        }
      })

      if(this.hayEncu==false){
        this.turnosS.devolverListadoTurnos().subscribe(listaT=>{
          listaT.filter(elementT=>{
            if(elementT.id==this.id)
            this.turno=elementT;
          })
          this.cargo=true;
        })
      }
      
    })

    


  }

  ngOnInit(): void {
  }

  carg1(){
    this.v1=true;
  }

  carg2(){
    this.v2=true;
  }

  carg3(){
    this.v3=true;
  }

  subirEncuesta(){  
    if(this.v1==true && this.v2==true && this.v3==true){
      let encu=new encuesta(this.condicionesPacienteR, this.insumosHospitalR, this.infraestructuraHospitalR, this.id);      
      
      this.turno.encuestaRespondidaMedico=true;
      this.turnosS.actualizarTurno(this.turno, 3);
      this.turnosS.createEncuesta(encu);
      this.mensaje="Gracias por responder";  
      this.color="alert-success";
      this.mostrar=true;
      this.router.navigate(["homeMedico"]);
    }else{
      this.color="alert-warning";

      this.mostrar=true;
      this.mensaje="Debe contestar todas las preguntas";
      
    }
  }

  seguir(){
    this.router.navigate(["homeMedico"]);
  }

  cerrarPopup(mostrar2:boolean){
    this.mostrar=mostrar2;
  }

}
