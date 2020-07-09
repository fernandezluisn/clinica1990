import { Component, OnInit } from '@angular/core';
import { ServicioService } from 'src/app/servicios/servicio.service';
import { BdaService } from 'src/app/servicios/bda.service';
import { TurnosService } from 'src/app/servicios/turnos.service';

@Component({
  selector: 'app-turnos-confirmados',
  templateUrl: './turnos-confirmados.component.html',
  styleUrls: ['./turnos-confirmados.component.css']
})
export class TurnosConfirmadosComponent implements OnInit {

  user;
  listaTurnos;
  medicoLogeado;

  constructor(private service:ServicioService, private bda:BdaService, private turnosBDA:TurnosService) {
    this.service.tomarUsuario().then(element=>
      {
        this.user=element;
        this.filtrarTurnos();
          this.bda.devolverListadoEmpleados().subscribe(lista=>{
            lista.forEach(elementL=>{
              if(elementL.email.toLowerCase()==this.user.email.toLowerCase())
              this.medicoLogeado=elementL;
            
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
        if(element.estado=="confirmado")
        j.push(element);
      })

      this.listaTurnos=j;
  })};

}
