import { Component, OnInit } from '@angular/core';
import { ServicioService } from 'src/app/servicios/servicio.service';
import { BdaService } from 'src/app/servicios/bda.service';
import { TurnosService } from 'src/app/servicios/turnos.service';
import { turno } from 'src/app/clases/turno';
import { DatePipe } from '@angular/common'
import { empleado } from 'src/app/clases/empleado';


@Component({
  selector: 'app-atencion-paciente',
  templateUrl: './atencion-paciente.component.html',
  styleUrls: ['./atencion-paciente.component.css']
})
export class AtencionPacienteComponent implements OnInit {

  txtResenia:string;
  user;
  medicoLogeado:empleado;
  descargo:boolean;
  turnosDelDia:turno[];
  turnoACompletar:turno;

  turnoSeleccionado=false;

  constructor(private service:ServicioService, private bda:BdaService, private turnosService:TurnosService, public datepipe: DatePipe) { 
    this.turnosDelDia=new Array();
    this.txtResenia=null;
    this.service.tomarUsuario().then(element=>{
      this.user=element;
      let dia=new Date();      
      let l=this.datepipe.transform(dia, 'yyyy-MM-dd');
     
      this.turnosService.devolverListadoTurnos().subscribe(lista=>{
        lista.filter(elemet=>{
          if((elemet.estado=="atendido" || elemet.estado=="confirmado") && elemet.fecha.toString()==l && elemet.empleado.email.toLowerCase()==this.user.email.toLowerCase())
          this.turnosDelDia.push(elemet); 
        })
               
      });

      this.bda.devolverListadoEmpleados().subscribe(lista=>{
        lista.forEach(elementL=>{
          if(elementL.email.toLowerCase()==this.user.email.toLowerCase())
          this.medicoLogeado=elementL;
          this.descargo=true;
        })
      });
    });
  }

  ngOnInit(): void {
    
  }

  traerTurnosDelPaciente(){

  }

  mostrarFormulario(turno:turno){
    this.turnoSeleccionado=true;
    this.turnoACompletar=turno;
  }

  subirResenia(){
    
    
    try{
      this.turnoACompletar.resenia=this.txtResenia;
      this.turnosService.actualizarTurno(this.turnoACompletar, 3);
      alert("El turno se informó correctamente");
    }catch(err)
    {
      alert(err);
    }
    
  }

}
