import { Component, OnInit } from '@angular/core';
import {ServicioService} from '../../servicios/servicio.service';
import { Router } from '@angular/router';

import {AngularFireStorage} from '@angular/fire/storage';

import {finalize} from 'rxjs/operators';
import { Observable } from 'rxjs';
import { paciente } from 'src/app/clases/paciente';
import { empleado } from 'src/app/clases/empleado';
import { BdaService } from 'src/app/servicios/bda.service';
import { especialidad } from 'src/app/clases/especialidad';
import { MedicosService } from 'src/app/servicios/medicos.service';



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
  captchaResuelto2:boolean;
  capt:boolean;
  listaEspecialidades;  
  
  mostrar=false;
  mensaje:string;
  color:string;

  uploadPercent1: Observable<number>;
  url1: string;

  uploadPercent2: Observable<number>;
  url2: string;

  constructor(private servicio:ServicioService, private router:Router, private storage:AngularFireStorage, private bda:BdaService, private bdaEspecialidades:MedicosService) { 
    this.mail="";
    this.pass2="";
    this.pass1="";
    this.apellido="";
    this.nombre="";
    this.tipoU=true;
    this.detallar=false;
    this.profesion="Clinico";
    this.captchaResuelto=false;
    this.captchaResuelto2=false;
    this.capt=true;
    

    this.bda.devolverListadoEspecialidades().subscribe(lista => {
      this.listaEspecialidades = lista;       
      
      });

      

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

  quitarCaptcha(){
    this.captchaResuelto=true;
    this.captchaResuelto2=true;
    this.capt=false;
  }

  registrar(){
    
    if(this.pass1==this.pass2 && this.captchaResuelto && this.captchaResuelto2){

      let u;
      
      let j=new Array();
      j.push(this.profesion);
      
      let j2=new Array();
      j2.push(this.profesion2);
      
      this.servicio.registrarUsuario(this.mail, this.pass2).then(async (res)=>{
        this.servicio.loginUser(this.mail, this.pass2);
        
        
        if(this.tipoU)        
        {     
          
         u=new paciente(this.nombre, this.apellido, this.url1, this.url2, this.mail);
         this.bda.createUsuario(u);
         this.bda.createPaciente(u).then(async (res)=>{
          this.router.navigate(['turnos']);
         }).catch(err=>{
          this.color="alert-warning";
          this.mensaje="error en el guardado de datos "+err.message; 
          this.mostrar=true;  
         });
        }          
        else
        {
          if(this.detallar){
            u=new empleado(this.nombre, this.apellido,  j2, this.mail, false);
            
            let e=new especialidad(this.profesion2, 0);
            this.bda.createEspecialidad(e);
            this.bdaEspecialidades.createEspecialidad(e, this.mail);
          }else{
            u=new empleado(this.nombre, this.apellido,  j, this.mail, false);
            this.bdaEspecialidades.createEspecialidad(u, this.mail);
          }
          
          this.bda.createUsuario(u);
         
          this.bda.createEmpleado(u).then(async (res)=>{
            this.bda.guardarLogin(this.mail);
            this.router.navigate(['homeMedico']);
          }).catch(err=>{
            this.color="alert-warning";
            this.mensaje="error en el guardado de datos "+err.message; 
            this.mostrar=true;  
            
          });
        }}).catch(error=>{
          this.color="alert-danger";
            this.mensaje=error.message; 
            this.mostrar=true;      
        });


    }else if(this.pass1!=this.pass2){  
      this.color="alert-warning";
      this.mensaje="Los passwords no coinciden."; 
      this.mostrar=true;           
      
    }else{
      this.color="alert-warning";
      this.mensaje="Marque el captcha"; 
      this.mostrar=true;       
    }

  }

  imagen1(img){
    
    const com=Math.random().toString(36).substring(2);
    const file= img.target.files[0];
    const path= 'imagenes1/'+ com;
    const ref=this.storage.ref(path);    
    const task=this.storage.upload(path, file);
    this.uploadPercent1=task.percentageChanges();
    
    task.snapshotChanges().pipe(finalize(()=>ref.getDownloadURL().subscribe(url=> this.url1=url))).subscribe();  
    
  }

  imagen2(img){
    
    const com2=Math.random().toString(36).substring(2);
    const file2= img.target.files[0];
    const path2= 'imagenes2/'+ com2;
    const ref2=this.storage.ref(path2); 
    const task2=this.storage.upload(path2, file2);
    this.uploadPercent2=task2.percentageChanges();
    task2.snapshotChanges().pipe(finalize(()=>ref2.getDownloadURL().subscribe(url=>this.url2=url))).subscribe();

    
  }

  hecho(e){   
    this.captchaResuelto=true;
  }

  respuesta(a:boolean){
    this.captchaResuelto2=a;
    if(a==true){
      this.color="alert-success";
      this.mensaje="Suma resuelta correctamente."; 
      this.mostrar=true; 
    }else{
      this.color="alert-danger";
      this.mensaje="La suma no fue resuelta correctamente."; 
      this.mostrar=true; 
    }
    
  }

  cerrarPopup(mostrar2:boolean){
    this.mostrar=mostrar2;
  }
}
