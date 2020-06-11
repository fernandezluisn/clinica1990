import { Injectable } from '@angular/core';
import {AngularFireAuth} from '@angular/fire/auth';






@Injectable({
  providedIn: 'root'
})
export class ServicioService {

  constructor(public afAuth:AngularFireAuth) { }

loginUser(email:string, password:string){
  return new Promise((resolve, reject)=>{
    this.afAuth.signInWithEmailAndPassword(email, password)
    .then( userData=>resolve(userData),
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

tomarUsuario(){
  return this.afAuth.currentUser;
}



}
