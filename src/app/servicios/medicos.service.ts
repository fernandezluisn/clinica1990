import { Injectable } from '@angular/core';
import { AngularFirestore, DocumentReference } from '@angular/fire/firestore';
import { especialidad } from '../clases/especialidad';
import { jornadaSemanal } from '../clases/jornadaSemanal';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MedicosService {

  listaJornadas:Observable<jornadaSemanal[]>;

  constructor(private db:AngularFirestore) { 
    this.listaJornadas=this.db.collection('jornadas').snapshotChanges().pipe(
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
  }

  createEspecialidad(especialidad:especialidad, id:string): Promise<DocumentReference> {
    return this.db.collection(id+"Especialidades").add({...especialidad});
  }

  createHorario(jornada:jornadaSemanal): Promise<DocumentReference> {
    return this.db.collection("jornadas").add({...jornada});
  }

  devolverListadoJornadas(){
    return this.listaJornadas;
  }

  updateJornada(jornada:jornadaSemanal) {    
          
          this.db.doc('jornadas/' + jornada.id).update({...jornada});     
    
  }
   

 
  
}
