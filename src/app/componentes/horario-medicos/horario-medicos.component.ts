import { Component, OnInit } from '@angular/core';
import { ServicioService } from 'src/app/servicios/servicio.service';
import { BdaService } from 'src/app/servicios/bda.service';
import { element } from 'protractor';

@Component({
  selector: 'app-horario-medicos',
  templateUrl: './horario-medicos.component.html',
  styleUrls: ['./horario-medicos.component.css']
})
export class HorarioMedicosComponent implements OnInit {

  medicoLogeado;
  user;

  constructor(private service: ServicioService, private bda:BdaService) {
    this.service.tomarUsuario().then(element=>{
      this.user=element;
      console.log(this.user.email);
      this.bda.devolverListadoEmpleados().subscribe(lista=>{
        lista.forEach(elementB=>{
          if(element.email.toLowerCase()===elementB.id.toLowerCase())
          this.medicoLogeado=elementB;
        })
      })
    })
   }

  ngOnInit(): void {
  }

}
