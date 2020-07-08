import { Injectable } from '@angular/core';
import {AngularFirestore, DocumentReference} from '@angular/fire/firestore';
import { Observable, Subject } from 'rxjs';
import { turno } from '../clases/turno';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TurnosService {

  constructor(private db:AngularFirestore) { }

  createTurno(turno:turno, id:string): Promise<DocumentReference> {
    return this.db.collection(id).add({...turno});
  } 

  turnosFiltradosPorMedico(emailMedico:string){
    let listaTurnosPorMedico=this.db.collection("turnosEmpleado"+emailMedico).snapshotChanges().pipe(
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
    return listaTurnosPorMedico;
  }
}
