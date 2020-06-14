import { Component, OnInit } from '@angular/core';
import {ServicioService} from '../../servicios/servicio.service';
import { Router } from '@angular/router';

import {AngularFireStorage} from '@angular/fire/storage';

import {finalize} from 'rxjs/operators';
import { Observable } from 'rxjs';
import { paciente } from 'src/app/clases/paciente';
import { empleado } from 'src/app/clases/empleado';
import { BdaService } from 'src/app/servicios/bda.service';


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
  url1: string;

  uploadPercent2: Observable<number>;
  url2: string;

  constructor(private servicio:ServicioService, private router:Router, private storage:AngularFireStorage, private bda:BdaService) { 
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

      let u;
      let j=new Array();
      j.push(this.profesion);
      let reg;

      this.servicio.registrarUsuario(this.mail, this.pass2).then(async (res)=>{
        this.servicio.loginUser(this.mail, this.pass2);
        this.servicio.tomarUsuario().then(res=>{
          reg=res;      
        }).catch(err=>{
          alert(err);
        });
        
        if(this.tipoU)        
        {
          
          
         u=new paciente(this.nombre, this.apellido, this.mail, this.url1, this.url2, reg.uid);
         this.bda.createPaciente(u);
        }          
        else
        {
          u=new empleado(this.nombre, this.apellido, this.mail, j, reg.uid);
          this.bda.createEmpleado(u);
        }     


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
    
    const com=Math.random().toString(36).substring(2);
    const file= img.target.files[0];
    const path= 'imagenes1/'+ com;
    const ref=this.storage.ref(path);    
    const task=this.storage.upload(path, file);
    this.uploadPercent1=task.percentageChanges();
    
    task.snapshotChanges().pipe(finalize(()=>ref.getDownloadURL().subscribe(url=> this.url1=url)));
    
    console.log("u1 "+this.url1);
  }

  imagen2(img){
    
    const com2=Math.random().toString(36).substring(2);
    const file2= img.target.files[0];
    const path2= 'imagenes2/'+ com2;
    const ref2=this.storage.ref(path2); 
    const task2=this.storage.upload(path2, file2);
    this.uploadPercent2=task2.percentageChanges();
    task2.snapshotChanges().pipe(finalize(()=>ref2.getDownloadURL().subscribe(url=>this.url2=url))).subscribe();

    console.log("u2 "+this.url2);
  }

  hecho(e){
    console.log("captcha "+e);
    this.captchaResuelto=true;
  }
}
