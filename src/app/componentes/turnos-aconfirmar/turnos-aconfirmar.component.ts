import { Component, OnInit } from '@angular/core';
import { turno } from 'src/app/clases/turno';
import { ServicioService } from 'src/app/servicios/servicio.service';
import { TurnosService } from 'src/app/servicios/turnos.service';
import { element } from 'protractor';
import { empleado } from 'src/app/clases/empleado';
import { BdaService } from 'src/app/servicios/bda.service';

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
  }

  ngOnInit(): void {
  }

  filtrarTurnos(){
    let j=new Array();
    
    this.turnosBDA.turnosFiltradosPorMedico(this.user.email).subscribe(lista=>{
      lista.filter(element=>{
        if(element.estado=="a confirmar")
        j.push(element);
      })

      this.listaTurnosA=j;
  })};

  cargarTurno(turno){
    try{
      console.log(turno.id)
      turno.resenia="No hay";
      this.turnosBDA.actualizarTurno(turno, 2);
      alert("El turno se aprobó correctamente.");
      this.filtrarTurnos();
    }catch(err){
      alert(err.message)
    }
    
  }

}
