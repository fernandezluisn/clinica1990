import { Injectable } from '@angular/core';
import {AngularFirestore, DocumentReference} from '@angular/fire/firestore';
import { turno } from '../clases/turno';
import { map } from 'rxjs/operators';
import {TurnosPipe} from '../pipes/turnos.pipe';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class TurnosService {

  listaTurnos:Observable<turno[]>;

  constructor(private db:AngularFirestore) {

    this.listaTurnos=this.db.collection("turnos").snapshotChanges().pipe(
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

  createTurno(turno:turno): Promise<DocumentReference> {
    return this.db.collection('turnos').add({...turno});
  }   

  


  actualizarTurno(turnoA:turno, estado:number) {  
    
    
    switch(estado){
      case 1:
        turnoA.estado="a confirmar";
        break; 
      case 2:
        turnoA.estado="confirmado";
        break;
      case 3:
        turnoA.estado="atendido";
        break;
      case 4:
        turnoA.estado="cancelado";
        break;
    }
    
    this.db.doc('turnos' + '/'+turnoA.id).update({...turnoA});    
    
  }

  devolverListadoTurnos(){
    return this.listaTurnos;
  }
}
