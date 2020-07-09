import { Injectable } from '@angular/core';
import {AngularFirestore, DocumentReference} from '@angular/fire/firestore';
import { Observable, Subject } from 'rxjs';
import { turno } from '../clases/turno';
import { map } from 'rxjs/operators';
import { element } from 'protractor';

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

  turnosFiltradosPorPaciente(emailPaciente:string){
    let listaTurnosPorPaciente=this.db.collection("turnosPaciente"+emailPaciente).snapshotChanges().pipe(
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
    return listaTurnosPorPaciente;
  }

  turnoFiltradoPorFecha(emailEmpleado:string, fecha:string){
    let listaFecha= this.db.collection(fecha+emailEmpleado).snapshotChanges().pipe(
      map(actions=>{
        return actions.map(
          a=>{
            const data= a.payload.doc.data();
            const id=a.payload.doc.id;
            return {id, ...(data as any)}
          }
        );
      }) 
    )
      return listaFecha;
  }

  confirmarTurno(turno:turno) {  
    turno.estado="confirmado";
    this.db.doc('turnosEmpleado' + turno.empleado.email +'/'+turno.id).update({...turno});
    
    this.turnoFiltradoPorFecha(turno.empleado.email, turno.fecha.toString()).subscribe(lista=>
      
      lista.forEach(turnoB=>{
        if(turnoB.numeroTurno==turno.numeroTurno){
          turnoB.estado="confirmado";
          this.db.doc( turno.fecha.toString()+turno.empleado.email+'/'+turnoB.id).update({...turnoB});
        }
      })
      )

    this.turnosFiltradosPorPaciente(turno.paciente.email).subscribe(lista=>{
      lista.forEach(element=>{
        console.log(element);
        let l:turno;
        if(turno.fecha.toString()==element.fecha.toString() && turno.paciente.email==element.paciente.email && turno.numeroTurno==element.numeroTurno)
        {
          l=element;
          l.estado="confirmado";
          this.db.doc("turnosPaciente"+turno.paciente.email+'/'+l.id).update({...l});
        }
      }
        
        )
    })
    
    
    
  }
}
