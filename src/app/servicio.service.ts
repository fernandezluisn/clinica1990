import { Injectable } from '@angular/core';
import {AngularFireAuth} from '@angular/fire/auth';
import {auth} from 'firebase/app';
import { promise } from 'protractor';
import { resolve } from 'dns';
import { rejects } from 'assert';

@Injectable({
  providedIn: 'root'
})
export class ServicioService {

  constructor(public afAuth:AngularFireAuth ) { }
//////////codigo de firebase/////////////
 /* service firebase.storage {
  match /b/{bucket}/o {
    match /{allPaths=**} {
      allow read, write: if request.auth != null;
    }
  }
}*/
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

registrarUsuario(){
  
}
}
