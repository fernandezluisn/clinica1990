import { Injectable } from '@angular/core';
import {AngularFirestore, DocumentReference} from '@angular/fire/firestore';
import { Observable, Subject } from 'rxjs';
import { empleado } from '../clases/empleado';
import { paciente } from '../clases/paciente';
import { map } from 'rxjs/operators';
import { especialidad } from '../clases/especialidad';
import { persona } from '../clases/persona';

@Injectable({
  providedIn: 'root'
})
export class BdaService {

  listaPacientes:Observable<paciente[]>;
  
  listaEmpleados:Observable<empleado[]>;

  listaUsuarios:Observable<persona[]>;

  listaEspecialidades:Observable<especialidad[]>;

  constructor(private db:AngularFirestore ) {

    
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
      }

      )

     
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

  devolverListadoUsuarios(){
    return this.listaUsuarios;
  }

  devolverListadoPacientes(){
    return this.listaPacientes;
  }

  devolverListadoEmpleados(){
    return this.listaEmpleados;
  }

  
  
}
