import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { TurnosService } from 'src/app/servicios/turnos.service';
import { turno } from 'src/app/clases/turno';

import { encuesta } from 'src/app/clases/encuesta';

@Component({
  selector: 'app-comentario',
  templateUrl: './comentario.component.html',
  styleUrls: ['./comentario.component.css']
})
export class ComentarioComponent implements OnInit {

  txtComentario:string;

  condicionesPaciente:string[]=["Buena","Regular","Mala"];;
  infraestructuraHospital:string[]=["Buena","Regular","Mala"];
  insumosHospital:string[]=["Suficiente","Regular","Insuficiente"];

  condicionesPacienteR:string;
  infraestructuraHospitalR:string;
  insumosHospitalR:string;

  v1=false;
  v2=false;
  v3=false;

  id:string;

  turno:turno;

  constructor(private router: Router, private tomarId:ActivatedRoute, private turnosS:TurnosService) { 
    this.id=this.tomarId.snapshot.paramMap.get('idTurno');
    this.turnosS.devolverListadoTurnos().subscribe(lista=>{
      lista.filter(element=>{
        if(element.id==this.id){
          this.turno=element;
        }
      })
    })
  }

  ngOnInit(): void {
  }

  subirComentario(){
    if(this.v1==true && this.v2==true && this.v3==true){
      this.turno.comentario=this.txtComentario;
      this.turnosS.actualizarTurno(this.turno, 3);

      let e=new encuesta(this.condicionesPacienteR, this.insumosHospitalR, this.infraestructuraHospitalR, this.id, this.turno.empleado.email, this.turno.paciente.email);
      e.paciente=true;
      this.turnosS.createEncuesta(e);
      alert("Gracias por su comentario.");
      this.router.navigate(["turnos"]);
    }
    else{
      alert("debe contestar todas las preguntas");
  }  
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

}
