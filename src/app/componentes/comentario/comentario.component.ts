import { Component, OnInit } from '@angular/core';

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

  constructor() { }

  ngOnInit(): void {
  }

  subirComentario(){

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
