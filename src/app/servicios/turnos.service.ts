import { Injectable } from '@angular/core';
import {AngularFirestore, DocumentReference} from '@angular/fire/firestore';
import { turno } from '../clases/turno';
import { map } from 'rxjs/operators';
import {TurnosPipe} from '../pipes/turnos.pipe';


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

  turnosFiltradosPorFechaYEmpleado(emailEmpleado:string, fecha:string){
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

  actualizarTurno(turno:turno, estado:number) {  
    let nuevoEstado:string;
    switch(estado){
      case 1:
        nuevoEstado="a confirmar";
        break; 
      case 2:
        nuevoEstado="confirmado";
        break;
      case 3:
        nuevoEstado="realizado";
        break;
      case 4:
        nuevoEstado="cancelado";
        break;
    }
    turno.estado=nuevoEstado;
    this.db.doc('turnosEmpleado' + turno.empleado.email +'/'+turno.id).update({...turno});
    
    this.turnosFiltradosPorFechaYEmpleado(turno.empleado.email, turno.fecha.toString()).subscribe(lista=>
      
      lista.forEach(turnoB=>{
        if(turnoB.numeroTurno==turno.numeroTurno){
          turnoB.estado=nuevoEstado;
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
          l.estado=nuevoEstado;
          this.db.doc("turnosPaciente"+turno.paciente.email+'/'+l.id).update({...l});
        }
      }
        
        )
    })
    
    
    
  }
}
