import { Injectable } from '@angular/core';
import { AngularFirestore, DocumentReference } from '@angular/fire/firestore';
import { especialidad } from '../clases/especialidad';
import { jornadaSemanal } from '../clases/jornadaSemanal';

@Injectable({
  providedIn: 'root'
})
export class MedicosService {

  constructor(private db:AngularFirestore) { }

  createEspecialidad(especialidad:especialidad, id:string): Promise<DocumentReference> {
    return this.db.collection(id+"Especialidades").add({...especialidad});
  }

  createHorario(jornada:jornadaSemanal): Promise<DocumentReference> {
    return this.db.collection("jornadas").add({...jornada});
  }
}
