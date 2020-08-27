import { Component, OnInit } from '@angular/core';
import { ServicioService } from 'src/app/servicios/servicio.service';
import { BdaService } from 'src/app/servicios/bda.service';
import { TurnosService } from 'src/app/servicios/turnos.service';
import { turno } from 'src/app/clases/turno';
import { DatePipe } from '@angular/common'
import { empleado } from 'src/app/clases/empleado';
import { element } from 'protractor';
import { Router } from '@angular/router';
import { especialidad } from 'src/app/clases/especialidad';


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

  listaEspecialidades:especialidad[];

  seAgregaronDatos=false;

  turnoSeleccionado=false;

  edad:number;
  temperatura:number;
  presion:number;

 

  control1;
  control2;
  control3;
  listaControles=["Select", "Rango", "Número"];
  listaSelect=["Si","No"];

  

  numero1:boolean;
  numero2:boolean;
  numero3:boolean;

  select1:boolean;
  select2:boolean;
  select3:boolean;

  rango1:boolean;
  rango2:boolean;
  rango3:boolean;

  dato1n:string;
  dato2n:string;
  dato3n:string;

  select1R="Si";
  rango1R=0;
  numero1R:number;

  select2R="Si";
  rango2R=0;
  numero2R:number;

  select3R="Si";
  rango3R=0;
  numero3R:number;

  n1=false;
  n2=false;
  n3=false;

  

 

  constructor(private router: Router, private service:ServicioService, private bda:BdaService, private turnosService:TurnosService, public datepipe: DatePipe) { 
    
    this.edad=30;
    this.temperatura=36.1;
    this.presion=14.3;

    this.control1="Select";
    this.numero1=false;
    this.select1=true;
    this.rango1=false;
    this.control2="Select";
    this.numero2=false;
    this.select2=true;
    this.rango2=false;
    this.control3="Select";
    this.numero3=false;
    this.select3=true;
    this.rango3=false;

    this.txtResenia=null;
    this.service.tomarUsuario().then(element=>{
      this.user=element;
      let dia=new Date();      
      let l=this.datepipe.transform(dia, 'yyyy-MM-dd');
     
      this.bda.devolverListadoEspecialidades().subscribe(listaE=>{
        this.listaEspecialidades=listaE;
      })

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

    let esp:especialidad;

    this.listaEspecialidades.forEach(element=>{
      if(element.nombre==this.turnoACompletar.especialidad){
        esp=element;
      }
    })

    esp.operaciones++;

    this.bda.updateEspecialidad(esp);
    
    if(this.seAgregaronDatos)
    {
      this.turnoACompletar.presión=this.presion;
      this.turnoACompletar.edad=this.edad;
      this.turnoACompletar.temperatura=this.temperatura;
      if(this.n1 && this.n2 && this.n3){
        this.turnoACompletar.dato1n=this.dato1n;
        this.llenar1();
        this.turnoACompletar.dato2n=this.dato2n;
        this.llenar2();
        this.turnoACompletar.dato3n=this.dato3n;
        this.llenar3();  
      }else if(this.n1 && this.n2){
        this.turnoACompletar.dato1n=this.dato1n;
        this.llenar1();
        this.turnoACompletar.dato2n=this.dato2n;
        this.llenar2();
        
      }else if(this.n1){
        this.turnoACompletar.dato1n=this.dato1n;
        this.llenar1();
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

  llenar1(){
    if(this.select1)
    this.turnoACompletar.dato1v=this.select1R;
    else if(this.numero1)
    this.turnoACompletar.dato1v=this.numero1R;
    else
    this.turnoACompletar.dato1v=this.rango1R;
  }

  llenar2(){
    if(this.select2)
    this.turnoACompletar.dato2v=this.select2R;
    else if(this.numero2)
    this.turnoACompletar.dato2v=this.numero2R;
    else
    this.turnoACompletar.dato2v=this.rango2R;

    console.log(this.turnoACompletar.dato2v);
  }

  llenar3(){
    if(this.select3)
    this.turnoACompletar.dato3v=this.select3R;
    else if(this.numero3)
    this.turnoACompletar.dato3v=this.numero3R;
    else
    this.turnoACompletar.dato3v=this.rango3R;
  }

  control1a(){
    switch(this.control1){
      case "Select":
        this.numero1=false;
        this.select1=true;
        this.rango1=false;
        break;
      case "Rango":
        this.numero1=false;
        this.select1=false;
        this.rango1=true;
        break;
      case "Número":
        this.numero1=true;
        this.select1=false;
        this.rango1=false;
        break;
    }
  }

  control1b(){
    switch(this.control2){
      case "Select":
        this.numero2=false;
        this.select2=true;
        this.rango2=false;
        break;
      case "Rango":
        this.numero2=false;
        this.select2=false;
        this.rango2=true;
        break;
      case "Número":
        this.numero2=true;
        this.select2=false;
        this.rango2=false;
        break;
    }
  }

  control1c(){
    switch(this.control3){
      case "Select":
        this.numero3=false;
        this.select3=true;
        this.rango3=false;
        break;
      case "Rango":
        this.numero3=false;
        this.select3=false;
        this.rango3=true;
        break;
      case "Número":
        this.numero3=true;
        this.select3=false;
        this.rango3=false;
        break;
    }
  }

  agregarDatos(){
    this.seAgregaronDatos=true;
  }

  sumarDato(){
    if(this.n1==false){
      this.n1=true;
    }else if (this.n2==false)
    {
      this.n2=true;
    }else{
      this.n3=true;
    }
    
  }

}
