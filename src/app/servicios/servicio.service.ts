import { Injectable } from '@angular/core';
import {AngularFireAuth} from '@angular/fire/auth';
import { Router } from '@angular/router';









@Injectable({
  providedIn: 'root'
})
export class ServicioService {

  d:Date;
  n:number;
  redirectUrl: string;
  user;

  
  constructor(public afAuth:AngularFireAuth, private router:Router) { 
    this.user=this.tomarUsuario().then(res=>this.user=res);    
    this.d = new Date();
    this.n = this.d.getMonth();    
  } 
  
     
  

loginUser(email:string, password:string){
  return new Promise((resolve, reject)=>{
    this.afAuth.signInWithEmailAndPassword(email, password)
    .then( userData=>
      resolve(userData)     
    
      ,
    
    err=>reject(err));
  });
  
  
}


logOutUser(){
  return this.afAuth.signOut();  
}

registrarUsuario(mail:string, password: string){
  return new Promise((resolve, reject)=>{
    this.afAuth.createUserWithEmailAndPassword(mail, password)
    .then(userData=>resolve(userData)),
    err=>reject(err);  
    
  });
  
}

async tomarUsuario(){  
  return this.afAuth.currentUser;
}



}
