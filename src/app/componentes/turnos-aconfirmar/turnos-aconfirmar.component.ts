import { Component, OnInit } from '@angular/core';
import { turno } from 'src/app/clases/turno';
import { ServicioService } from 'src/app/servicios/servicio.service';
import { TurnosService } from 'src/app/servicios/turnos.service';
import { element } from 'protractor';
import { empleado } from 'src/app/clases/empleado';

@Component({
  selector: 'app-turnos-aconfirmar',
  templateUrl: './turnos-aconfirmar.component.html',
  styleUrls: ['./turnos-aconfirmar.component.css']
})
export class TurnosAConfirmarComponent implements OnInit {

  listaTurnos:turno[];
  user;

  constructor(private service:ServicioService, private turnosBDA:TurnosService) { 
    this.service.tomarUsuario().then(element=>
      {
        this.user=element;
        this.turnosBDA.turnosFiltradosPorMedico(this.user.email).subscribe(lista=>{
          this.listaTurnos=lista;
        })
      }
      );
  }

  ngOnInit(): void {
  }

}
