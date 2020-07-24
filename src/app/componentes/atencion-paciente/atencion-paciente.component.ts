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

  seAgregaronDatos=false;

  turnoSeleccionado=false;

  edad:number;
  temperatura:number;
  presion:number;

  dato1:any;
  dato2:any;
  dato3:any;

  dato1n:string;
  dato2n:string;
  dato3n:string;

  n1=false;
  n2=false;
  n3=false;

  contador=0;

 

  constructor(private router: Router, private service:ServicioService, private bda:BdaService, private turnosService:TurnosService, public datepipe: DatePipe) { 
    
    this.edad=30;
    this.temperatura=36.1;
    this.presion=14.3;

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

   
    
  }

  mostrarFormulario(turno:turno){
    this.turnoSeleccionado=true;
    this.turnoACompletar=turno;
    this.traerTurnosDelPaciente();
  }

  subirResenia(){
    
    console.log(this.turnoACompletar);
    if(this.seAgregaronDatos)
    {
      this.turnoACompletar.presión=this.presion;
      this.turnoACompletar.edad=this.edad;
      this.turnoACompletar.temperatura=this.temperatura;
      switch(this.contador){
        case(1):
          this.turnoACompletar.dato1n=this.dato1n;
          this.turnoACompletar.dato1v=this.dato1;
        break;
        case(2):
          this.turnoACompletar.dato1n=this.dato1n;
          this.turnoACompletar.dato1v=this.dato1;
          this.turnoACompletar.dato2n=this.dato2n;
          this.turnoACompletar.dato2v=this.dato2;
        break;
        case(3):
        console.log(this.dato1n);
        this.turnoACompletar.dato1n=this.dato1n;
          this.turnoACompletar.dato1v=this.dato1;
          this.turnoACompletar.dato2n=this.dato2n;
          this.turnoACompletar.dato2v=this.dato2;
          this.turnoACompletar.dato3n=this.dato3n;
          this.turnoACompletar.dato3v=this.dato3;          
        break;        
      }  
    }
    

    try{
      this.turnoACompletar.resenia=this.txtResenia;
      this.turnosService.actualizarTurno(this.turnoACompletar, 3);
      alert("El turno se informó correctamente");
      this.router.navigate(["encuesta/"+ this.turnoACompletar.id]);
    }catch(err)
    {
      alert(err);
    }
    
  }

  agregarDatos(){
    this.seAgregaronDatos=true;
  }

  sumarDato(){
    if(this.contador<3){
      console.log(this.contador);

      switch(this.contador){
        case(0):
        this.n1=true;
        this.n2=false;
        this.n3=false;
        break;
        case(1):
        this.n1=true;
        this.n2=true;
        this.n3=false;
        case(2):
        this.n1=true;
        this.n2=true;
        this.n3=true;
      }
      this.contador++;
    }else{
      alert("No puede agregar más de 3 nuevas categorías.");
    }
    
  }

}
