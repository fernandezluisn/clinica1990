import { Injectable } from '@angular/core';
import {AngularFirestore, DocumentReference} from '@angular/fire/firestore';
import { Observable, Subject } from 'rxjs';
import { empleado } from '../clases/empleado';
import { paciente } from '../clases/paciente';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class BdaService {

  listaPacientes:Observable<paciente[]>;
  
  listaEmpleados:Observable<empleado[]>;

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


   
    
    
    this.listaPacientes=this.db.collection('usuarios').snapshotChanges().pipe(
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

  createPaciente(pac:paciente): Promise<DocumentReference> {
    return this.db.collection('usuarios').add({...pac});
  }

  createEmpleado(emp:empleado): Promise<DocumentReference> {
    return this.db.collection('empleados').add({...emp});
  }

  devolverListadoPacientes(){
    return this.listaPacientes;
  }

  devolverListadoEmpleados(){
    return this.listaEmpleados;
  }

  
  
}
