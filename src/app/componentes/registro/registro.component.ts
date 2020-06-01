import { Component, OnInit } from '@angular/core';
import {ServicioService} from '../../servicio.service';
import { Router } from '@angular/router';
import {AngularFireStorage} from '@angular/fire/storage';
import {finalize} from 'rxjs/operators';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {
  mail:string;
  pass1:string;
  pass2:string;
  tipoU:boolean;
  apellido:string;
  nombre:string;
  profesion:string;
  profesion2:string;
  detallar:boolean;
  captchaResuelto:boolean;
  

  uploadPercent1: Observable<number>;
  url1: Observable<string>;

  uploadPercent2: Observable<number>;
  url2: Observable<string>;

  constructor(private servicio:ServicioService, private router:Router, private storage:AngularFireStorage) { 
    this.mail="";
    this.pass2="";
    this.pass1="";
    this.apellido="";
    this.nombre="";
    this.tipoU=true;
    this.detallar=false;
    this.profesion="Clinico";
    this.captchaResuelto=false;
  }

  ngOnInit(): void {
  }

  cambiarP(){
    this.tipoU=true;
  }

  cambiarE(){
    this.tipoU=false;
  }

  carg(){
    console.log(this.profesion);
    if(this.profesion=='Otra')
    {
      this.detallar=true;
    }else
    {
      this.detallar=false;
    }
  }

  registrar(){
    if(this.pass1==this.pass2 && this.captchaResuelto){
      this.servicio.registrarUsuario(this.mail, this.pass2).then((res)=>{
        this.router.navigate(['turnos']);
      }).catch(err=>{
        alert(err);
      });


    }else if(this.pass1!=this.pass2){      
      alert("Los passwords no coinciden.");
    }else{
      alert("Marque el captcha");
    }

  }

  imagen1(img){
    console.log(img);
    const com=Math.random().toString(36).substring(2);
    const file= img.target.files[0];
    const path= 'imagenes/'+ com;
    const ref= this.storage.ref(path);
    const task= this.storage.upload(path, file);
  }

  imagen2(img){
    console.log(img);
  }

  hecho(e){
    console.log(e);
    this.captchaResuelto=true;
  }
}
