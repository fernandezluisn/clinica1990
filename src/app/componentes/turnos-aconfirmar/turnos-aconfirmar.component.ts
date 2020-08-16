import { Component, OnInit } from '@angular/core';
import { turno } from 'src/app/clases/turno';
import { ServicioService } from 'src/app/servicios/servicio.service';
import { TurnosService } from 'src/app/servicios/turnos.service';
import { empleado } from 'src/app/clases/empleado';
import { BdaService } from 'src/app/servicios/bda.service';
import { especialidad } from 'src/app/clases/especialidad';
import { element } from 'protractor';

@Component({
  selector: 'app-turnos-aconfirmar',
  templateUrl: './turnos-aconfirmar.component.html',
  styleUrls: ['./turnos-aconfirmar.component.css']
})
export class TurnosAConfirmarComponent implements OnInit {

  listaTurnosA:turno[];
  user;
  medicoLogeado:empleado;
  descargo:boolean;
  noHayTurnos=false;
  listaEspecialidades:especialidad[];

  constructor(private service:ServicioService, private turnosBDA:TurnosService, private bda:BdaService) { 
    this.service.tomarUsuario().then(element=>
      {
        this.listaTurnosA=new Array();
        this.user=element;
        this.filtrarTurnos();
          
          this.bda.devolverListadoEmpleados().subscribe(lista=>{
            lista.forEach(elementL=>{
              if(elementL.email.toLowerCase()==this.user.email.toLowerCase())
              this.medicoLogeado=elementL;
              this.descargo=true;
          });
        })
      }
      );

      this.bda.devolverListadoEspecialidades().subscribe(lista=>{
        this.listaEspecialidades=lista;
      })
  }

  ngOnInit(): void {
  }

  filtrarTurnos(){
    let j=new Array();
    
    this.turnosBDA.devolverListadoTurnos().subscribe(lista=>{
      lista.filter(element=>{
        if(element.estado=="a confirmar" && element.empleado.email==this.user.email)
        {
          j.push(element);
          console.log(element);
        }
        
      })
      

      this.listaTurnosA=j;
      this.ordenarTabla();
  })};

  ordenarTabla(){
    

    this.listaTurnosA.sort((a,b) => Number(Date.parse(a.fecha.toString())) - Number(Date.parse(b.fecha.toString())));
   
    if(this.listaTurnosA.length==0)
      this.noHayTurnos=true;
      else
      this.noHayTurnos=false;
      
  }

  cargarTurno(turno:turno){

    let e:especialidad;

    try{
      this.listaEspecialidades.forEach(element=>{
        if (element.nombre==turno.especialidad){
          e=element;
        }
      })

      e.operaciones++;

      this.bda.updateEspecialidad(e);
      turno.resenia="No hay";
      this.turnosBDA.actualizarTurno(turno, 2);
      this.filtrarTurnos();
      alert("El turno se aprobó correctamente.");
      
    }catch(err){
      alert(err.message)
    }
    
  }

}
