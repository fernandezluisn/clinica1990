import { Injectable } from '@angular/core';
import {AngularFirestore, DocumentReference} from '@angular/fire/firestore';
import { Observable, Subject } from 'rxjs';
import { turno } from '../clases/turno';

@Injectable({
  providedIn: 'root'
})
export class TurnosService {

  constructor(private db:AngularFirestore) { }

  createTurno(turno:turno, id:string): Promise<DocumentReference> {
    return this.db.collection(id).add({...turno});
  }
}
