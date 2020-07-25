import { Component, OnInit } from '@angular/core';
import { turno } from 'src/app/clases/turno';
import { ServicioService } from 'src/app/servicios/servicio.service';
import { TurnosService } from 'src/app/servicios/turnos.service';

@Component({
  selector: 'app-historial-pacientes',
  templateUrl: './historial-pacientes.component.html',
  styleUrls: ['./historial-pacientes.component.css']
})
export class HistorialPacientesComponent implements OnInit {

  listaTurnosC:turno[];
  user;
  hayTurno:boolean;
  turnoElegido:turno;

  constructor(private bda:TurnosService, private service:ServicioService) { 
    
    this.hayTurno=false;
    
    this.service.tomarUsuario().then(element=>{
      this.user=element;
      let c=new Array();

      this.bda.devolverListadoTurnos().subscribe(lista=>{
        lista.filter(elementL=>{
          if(elementL.empleado.email.toLowerCase()==element.email.toLowerCase() && elementL.estado=="atendido")
          c.push(elementL);
        })

        
      })
      this.listaTurnosC=c;
    })
  }

  ngOnInit(): void {
  }

  tomarTurno(turno){
    this.turnoElegido=turno;
    this.hayTurno=true;
  }

}
