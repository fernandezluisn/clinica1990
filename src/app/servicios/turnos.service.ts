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

  actualizarTurno(turnoA:turno, estado:number) {  
    console.log("Numero real"+turnoA.numeroTurno);
    let nuevoEstado:string;
    switch(estado){
      case 1:
        nuevoEstado="a confirmar";
        break; 
      case 2:
        nuevoEstado="confirmado";
        break;
      case 3:
        nuevoEstado="atendido";
        break;
      case 4:
        nuevoEstado="cancelado";
        break;
    }
    turnoA.estado=nuevoEstado;
    this.db.doc('turnosEmpleado' + turnoA.empleado.email +'/'+turnoA.id).update({...turno});
    
    this.turnosFiltradosPorFechaYEmpleado(turnoA.empleado.email, turnoA.fecha.toString()).subscribe(lista=>
      
      lista.forEach(turnoB=>{
        if(turnoB.numeroTurno==turnoA.numeroTurno){
          console.log(turnoB.numeroTurno+" a: "+ turnoA.numeroTurno);
          turnoB.estado=nuevoEstado;
          turnoB.resenia=turnoA.resenia;
          this.db.doc( turnoA.fecha.toString()+turnoA.empleado.email+'/'+turnoB.id).update({...turnoB});
        }
      })
      )

    this.turnosFiltradosPorPaciente(turnoA.paciente.email).subscribe(listaB=>{
      listaB.forEach(element=>{
        
        let l:turno;
        if(turnoA.fecha.toString()==element.fecha.toString() && turnoA.paciente.email==element.paciente.email && turnoA.numeroTurno===element.numeroTurno)
        {
          l=element;
          l.estado=nuevoEstado;
          l.resenia=turnoA.resenia;
          this.db.doc("turnosPaciente"+turnoA.paciente.email+'/'+l.id).update({...l});
        }
      }
        
        )
    })
    
    
    
  }
}
