import { Injectable } from '@angular/core';
import {AngularFireAuth} from '@angular/fire/auth';
import {AngularFirestore} from '@angular/fire/firestore';



import {paciente} from '../app/clases/paciente';

@Injectable({
  providedIn: 'root'
})
export class ServicioService {

  constructor(public afAuth:AngularFireAuth, private db:AngularFirestore ) { }

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

guardarPacienteEnBD(paciente: paciente){
  

}

}
