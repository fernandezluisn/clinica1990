import { Injectable } from '@angular/core';
import {AngularFirestore, DocumentReference} from '@angular/fire/firestore';
import { turno } from '../clases/turno';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { encuesta } from '../clases/encuesta';
import { comentario } from '../clases/comentario';


@Injectable({
  providedIn: 'root'
})
export class TurnosService {

  listaTurnos:Observable<turno[]>;
  listaEncuestas:Observable<encuesta[]>;
  listaComentarios:Observable<comentario[]>;

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

    this.listaComentarios=this.db.collection("comentarios").snapshotChanges().pipe(
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

    this.listaEncuestas=this.db.collection("encuestas").snapshotChanges().pipe(
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

  createEncuesta(encuesta:encuesta): Promise<DocumentReference> {
    return this.db.collection('encuestas').add({...encuesta});
  }   

  createComentario(comentario:comentario): Promise<DocumentReference> {
    return this.db.collection('comentarios').add({...comentario});
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

  devolverListadoEncuestas(){
    return this.listaEncuestas;
  }

  devolverListadoComentarios(){
    return this.listaComentarios;
  }
}
