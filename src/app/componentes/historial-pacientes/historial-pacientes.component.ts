import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
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
  hora:string;

  constructor(private bda:TurnosService, private service:ServicioService, private router:Router, private spin:NgxSpinnerService) { 
    
    this.hayTurno=false;
    
    this.service.tomarUsuario().then(element=>{
      this.user=element;     
      
    })

    let c=new Array();

      this.bda.devolverListadoTurnos().subscribe(lista=>{
        
        lista.filter(elementL=>{
          
          if(elementL.empleado.email.toLowerCase()==this.user.email.toLowerCase() && elementL.estado=="atendido")
          c.push(elementL);
        })

        this.listaTurnosC=c;
      })
  }

  ngOnInit(): void {
  }

  cerrar(){    
    this.service.logOutUser();    
    this.router.navigate(['']);
  }

  tomarTurno(turno){
    this.turnoElegido=turno;
    this.hayTurno=true;
  }

  spinner():void{
    this.spin.show();
    setTimeout(()=>{
      this.spin.hide();
    }, 3000)
  }

}
