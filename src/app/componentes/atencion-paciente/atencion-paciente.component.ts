import { Component, OnInit } from '@angular/core';
import { ServicioService } from 'src/app/servicios/servicio.service';
import { BdaService } from 'src/app/servicios/bda.service';
import { TurnosService } from 'src/app/servicios/turnos.service';
import { turno } from 'src/app/clases/turno';
import { DatePipe } from '@angular/common'
import { empleado } from 'src/app/clases/empleado';
import { element } from 'protractor';

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
      console.log(l);
      this.turnosService.turnosFiltradosPorFechaYEmpleado(this.user.email, l).subscribe(lista=>{
        lista.forEach(elemet=>{
          if(elemet.estado=="atendido" || elemet.estado=="confirmado")
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
      this.turnosService.turnosFiltradosPorMedico(this.medicoLogeado.email).subscribe(lista=>
        {     
          
          lista.forEach(element=>
            {
              if(element.empleado.email.toLowerCase()==this.medicoLogeado.email.toLowerCase() && element.numeroTurno==this.turnoACompletar.numeroTurno){
                element.resenia=this.txtResenia;
                this.turnoACompletar=element;
                this.turnoACompletar.resenia=this.txtResenia;
                this.turnosService.actualizarTurno(this.turnoACompletar, 3);
              }
            })
        }
        );      
      let dia=new Date();      
      let l=this.datepipe.transform(dia, 'yyyy-MM-dd');
      this.turnosService.turnosFiltradosPorFechaYEmpleado(this.user.email, l).subscribe(lista=>{
        this.turnosDelDia=lista;        
      });
      alert("El turno se informó correctamente");
    }catch(err)
    {
      alert(err);
    }
    
  }

}
