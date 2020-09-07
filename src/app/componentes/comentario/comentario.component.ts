import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { TurnosService } from 'src/app/servicios/turnos.service';
import { turno } from 'src/app/clases/turno';

import { comentario } from 'src/app/clases/comentario';

@Component({
  selector: 'app-comentario',
  templateUrl: './comentario.component.html',
  styleUrls: ['./comentario.component.css']
})
export class ComentarioComponent implements OnInit {

  txtComentario="";

  rango1R=50;
  valoracionEstrellas=1;
  movioEstrellas=false;

  radioValues=["Muy bueno", "Bueno", "Regular", "Malo", "Muy malo"];

  chF=false;
  chA=false;
  chC=false;

  radioV="Muy bueno";
  

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
    if(this.txtComentario.length>0 && this.movioEstrellas){
      this.turno.comentario=this.txtComentario;
      this.turno.encuestaRespondidaPaciente=true;
      this.turnosS.actualizarTurno(this.turno, 3);

      
      let e=new comentario(this.rango1R, this.radioV, this.valoracionEstrellas, [this.chF, this.chA,this.chC], this.txtComentario, this.id);
      
      this.turnosS.createComentario(e);
      alert("Gracias por su comentario.");
      this.router.navigate(["turnos"]);
    }
    else{
      alert("debe contestar todas las preguntas");
  }  
  }

  checkbox1(){
    if(this.chF==false)
    this.chF=true
    else
    this.chF=false;
  }

  checkbox2(){
    if(this.chA==false)
    this.chA=true
    else
    this.chA=false;
  }

  checkbox3(){
    if(this.chC==false)
    this.chC=true
    else
    this.chC=false;
  }

  radio(res:string){
    this.radioV=res;
  }

  estrella1(){
    document.getElementById('estrella1').style.color = "yellow";
    document.getElementById('estrella2').style.color = "black";
    document.getElementById('estrella3').style.color = "black";
    document.getElementById('estrella4').style.color = "black";
    document.getElementById('estrella5').style.color = "black";

    this.valoracionEstrellas=1;
    this.movioEstrellas=true;
  }

  estrella2(){
    document.getElementById('estrella1').style.color = "yellow";
    document.getElementById('estrella2').style.color = "yellow";
    document.getElementById('estrella3').style.color = "black";
    document.getElementById('estrella4').style.color = "black";
    document.getElementById('estrella5').style.color = "black";  
  
    this.valoracionEstrellas=2;
    this.movioEstrellas=true;
  }

  estrella3(){
    document.getElementById('estrella1').style.color = "yellow";
    document.getElementById('estrella2').style.color = "yellow";
    document.getElementById('estrella3').style.color = "yellow";
    document.getElementById('estrella4').style.color = "black";
    document.getElementById('estrella5').style.color = "black";  
  
    this.valoracionEstrellas=3;
    this.movioEstrellas=true;
  }

  estrella4(){
    document.getElementById('estrella1').style.color = "yellow";
    document.getElementById('estrella2').style.color = "yellow";
    document.getElementById('estrella3').style.color = "yellow";
    document.getElementById('estrella4').style.color = "yellow";
    document.getElementById('estrella5').style.color = "black";  
  
    this.valoracionEstrellas=4;
    this.movioEstrellas=true;
  }
  estrella5(){
    document.getElementById('estrella1').style.color = "yellow";
    document.getElementById('estrella2').style.color = "yellow";
    document.getElementById('estrella3').style.color = "yellow";
    document.getElementById('estrella4').style.color = "yellow";
    document.getElementById('estrella5').style.color = "yellow";  
  
    this.valoracionEstrellas=5;
    this.movioEstrellas=true;
  }

}
