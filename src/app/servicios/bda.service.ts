import { Injectable } from '@angular/core';
import {AngularFirestore, DocumentReference} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { empleado } from '../clases/empleado';
import { paciente } from '../clases/paciente';
import { map } from 'rxjs/operators';
import { especialidad } from '../clases/especialidad';
import { persona } from '../clases/persona';
import { admin } from '../clases/admin';
import { log } from '../clases/log';

@Injectable({
  providedIn: 'root'
})
export class BdaService {

  listaPacientes:Observable<paciente[]>;
  
  listaEmpleados:Observable<empleado[]>;

  listaUsuarios:Observable<persona[]>;

  listaEspecialidades:Observable<especialidad[]>;

  listaAdministradores:Observable<admin[]>;


  listaLogins:Observable<log[]>;


  constructor(private db:AngularFirestore ) {


    this.listaAdministradores=this.db.collection('administradores').snapshotChanges().pipe(
      map(actions=>{
        return actions.map(
          a=>{
            const data= a.payload.doc.data();
            const id=a.payload.doc.id;
            return {id, ...(data as any)}
          }
        );
      }

      )

     
    );

    this.listaLogins=this.db.collection('logins').snapshotChanges().pipe(
      map(actions=>{
        return actions.map(
          a=>{
            const data= a.payload.doc.data();
            const id=a.payload.doc.id;
            return {id, ...(data as any)}
          }
        );
      }

      )

     
    );
    

    this.listaEmpleados=this.db.collection('empleados').snapshotChanges().pipe(
      map(actions=>{
        return actions.map(
          a=>{
            const data= a.payload.doc.data();
            const id=a.payload.doc.id;
            return {id, ...(data as any)}
          }
        );
      }

      )

     
    );

    this.listaEspecialidades=this.db.collection('especialidades').snapshotChanges().pipe(
      map(actions=>{
        return actions.map(
          a=>{
            const data= a.payload.doc.data();
            const id=a.payload.doc.id;
            return {id, ...(data as any)}
          }
        );
      }

      )

     
    );




    this.listaUsuarios=this.db.collection('usuarios').snapshotChanges().pipe(
      map(actions=>{
        return actions.map(
          a=>{
            const data= a.payload.doc.data();
            const id=a.payload.doc.id;
            return {id, ...(data as any)}
          }
        );
      })   
    );


   
    
    
    this.listaPacientes=this.db.collection('pacientes').snapshotChanges().pipe(
      map(actions=>{
        return actions.map(
          a=>{
            const data= a.payload.doc.data();
            const id=a.payload.doc.id;
            return {id, ...(data as any)}
          }
        );
      }

      )

     
    );


   }

  ;

  createAdmin(pac:admin): Promise<DocumentReference> {
    return this.db.collection('administradores').add({...pac});
  }

  createEspecialidad(pac:especialidad): Promise<DocumentReference> {
    return this.db.collection('especialidades').add({...pac});
  }

  createPaciente(pac:paciente): Promise<DocumentReference> {
    return this.db.collection('pacientes').add({...pac});
  }

  createUsuario(emp:persona): Promise<DocumentReference> {
    return this.db.collection('usuarios').add({...emp});
  }

  createEmpleado(emp:empleado): Promise<DocumentReference> {
    return this.db.collection('empleados').add({...emp});
  }

  devolverListadoEspecialidades(){
    return this.listaEspecialidades;
  }

  devolverListadoAdministradores(){
    return this.listaAdministradores;
  }

  devolverListadoUsuarios(){
    return this.listaUsuarios;
  }

  devolverListadoPacientes(){
    return this.listaPacientes;
  }

  devolverListadoLogins(){
    return this.listaLogins;
    
  }

  devolverListadoEmpleados(){
    return this.listaEmpleados;
  }

  updateEspecialidad(usuario:especialidad) {
    
    let l;
  
    this.listaEspecialidades.subscribe(lista=>{
      
      lista.forEach(element=>{
        if(element.nombre==usuario.nombre)
        {
          l=element;          
          this.db.doc('especialidades/' + l.id).update({...usuario});         
        }
      })
      
    });
    
  }

  updateEmpleado(usuario:empleado) {
    
    let l;
  
    this.listaEmpleados.subscribe(lista=>{
      
      lista.forEach(element=>{
        if(element.email.toLowerCase()==usuario.email.toLowerCase())
        {
          l=element;          
          this.db.doc('empleados/' + l.id).update({...usuario});         
        }
      })
      
    });
    
  }

  guardarLogin(email:string){
    
   
    let d=new Date().toDateString();
    let h=new Date().toTimeString();
   

    let pac=new log(email, d, h);

    return this.db.collection('logins').add({...pac});
  
   
  }

  

  updateUsuario(usuario:empleado) {
    let l;
  
    this.listaUsuarios.subscribe(lista=>{
      
      lista.forEach(element=>{
        if(element.email.toLowerCase()==usuario.email.toLowerCase())
        {
          l=element;
          usuario.id=element.id;
          this.db.doc('usuarios/' + l.id).update({...usuario});
        }
      })
      
    });
    
    
  }

  
  
}
