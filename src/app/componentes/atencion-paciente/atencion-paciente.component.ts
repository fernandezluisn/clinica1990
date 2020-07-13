import { Component, OnInit } from '@angular/core';
import { ServicioService } from 'src/app/servicios/servicio.service';
import { BdaService } from 'src/app/servicios/bda.service';
import { TurnosService } from 'src/app/servicios/turnos.service';
import { turno } from 'src/app/clases/turno';
import { DatePipe } from '@angular/common'
import { empleado } from 'src/app/clases/empleado';
import { element } from 'protractor';
import { Router } from '@angular/router';


@Component({
  selector: 'app-atencion-paciente',
  templateUrl: './atencion-paciente.component.html',
  styleUrls: ['./atencion-paciente.component.css']
})
export class AtencionPacienteComponent implements OnInit {

  txtResenia:string;
  user;
  medicoLogeado:empleado;
  descargo:boolean=false;
  turnosDelDia:turno[];
  turnoACompletar:turno;
  listadoCompleto:turno[];
  noHayTurnos=true;

  turnoSeleccionado=false;

  constructor(private router: Router, private service:ServicioService, private bda:BdaService, private turnosService:TurnosService, public datepipe: DatePipe) { 
    
    this.txtResenia=null;
    this.service.tomarUsuario().then(element=>{
      this.user=element;
      let dia=new Date();      
      let l=this.datepipe.transform(dia, 'yyyy-MM-dd');
     

     this.bda.devolverListadoEmpleados().subscribe(lista=>{
      lista.filter(elementL=>{
        if(elementL.email.toLowerCase()==this.user.email.toLowerCase())
        {
          this.medicoLogeado=elementL;
          this.descargo=true;
          
        }
        
      })
    });
    let a=new Array();
      this.turnosService.devolverListadoTurnos().subscribe(lista=>{
        this.listadoCompleto=lista;
        lista.filter(elemet=>{
          if((elemet.estado=="atendido" || elemet.estado=="confirmado") && elemet.fecha.toString()==l.toString() && elemet.empleado.email.toLowerCase()==this.user.email.toLowerCase()){
            
            this.noHayTurnos=false;
            a.push(elemet); 
          }
          
        })
        
      });
      this.turnosDelDia=a;
      this.ordenarTabla();  
      
      
    });
  }

  ngOnInit(): void {
    
  }

  ordenarTabla(){
    
    this.turnosDelDia.sort((a,b) => Number(a.numeroTurno) - Number(b.numeroTurno));
    
    
   
  }

  traerTurnosDelPaciente(){
    let j=new Array();

    this.listadoCompleto.filter(element=>{
      if(element.paciente.email.toLowerCase()==this.turnoACompletar.paciente.email.toLowerCase() && element.estado=="atendido"){
        j.push(element);
      }
    })

    this.turnosDelDia=j;
    this.turnosDelDia.sort((a,b) => Number(Date.parse(a.fecha.toString())) - Number(Date.parse(b.fecha.toString())));
  }

  mostrarFormulario(turno:turno){
    this.turnoSeleccionado=true;
    this.turnoACompletar=turno;
    this.traerTurnosDelPaciente();
  }

  subirResenia(){
    
    
    try{
      this.turnoACompletar.resenia=this.txtResenia;
      this.turnosService.actualizarTurno(this.turnoACompletar, 3);
      alert("El turno se informó correctamente");
      this.router.navigate(["encuesta"]);
    }catch(err)
    {
      alert(err);
    }
    
  }

}
