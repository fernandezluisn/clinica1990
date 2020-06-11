import { Injectable } from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import { Observable, Subject } from 'rxjs';
import { empleado } from '../clases/empleado';
import { paciente } from '../clases/paciente';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class BdaService {

  listaPacientes:Observable<paciente[]>;
  listaUsuarios:Subject<paciente[]>;
  listaEmpleados:Observable<empleado[]>;

  constructor(private db:AngularFirestore ) {

    this.listaUsuarios=new Subject<paciente[]>();
    this.listaPacientes=this.db.collection('usuarios').snapshotChanges().pipe(
      map(actions=>{
        return actions.map(
          a=>{
            const data= a.payload.doc.data();
            const id=a.payload.doc.id;
            return {id, ...(data as any)}
          }
        )
      }

      )

     
    );


   }

  ;

  devolverListado(){
    return this.listaUsuarios;
  }
  
}
