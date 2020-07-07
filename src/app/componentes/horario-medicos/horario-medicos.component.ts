import { Component, OnInit } from '@angular/core';
import { ServicioService } from 'src/app/servicios/servicio.service';
import { BdaService } from 'src/app/servicios/bda.service';
import { element } from 'protractor';
import { empleado } from 'src/app/clases/empleado';

@Component({
  selector: 'app-horario-medicos',
  templateUrl: './horario-medicos.component.html',
  styleUrls: ['./horario-medicos.component.css']
})
export class HorarioMedicosComponent implements OnInit {

  medicoLogeado:empleado;
  user;

  constructor(private service: ServicioService, private bda:BdaService) {
    this.service.tomarUsuario().then(element=>{
      this.user=element;
      console.log(this.user.email);
      this.bda.devolverListadoEmpleados().subscribe(lista=>{
        lista.forEach(elementB=>{
          if(element.email.toLowerCase()===elementB.email.toLowerCase())
          this.medicoLogeado=elementB;
        })
      })
    })
   }

  ngOnInit(): void {
  }

  agregar(espec){
    
    this.medicoLogeado.especialidades.push(espec.nombre);
    console.log(this.medicoLogeado.especialidades);
    this.bda.updateUsuario(this.medicoLogeado);
    this.bda.updateEmpleado(this.medicoLogeado);
  }

}
