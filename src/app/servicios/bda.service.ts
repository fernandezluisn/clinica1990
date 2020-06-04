import { Injectable } from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { empleado } from '../clases/empleado';
import { paciente } from '../clases/paciente';

@Injectable({
  providedIn: 'root'
})
export class BdaService {

  listaPacientes:Observable<paciente[]>;
  listaEmpleados:Observable<empleado[]>;

  constructor(private db:AngularFirestore ) { }

  
}
