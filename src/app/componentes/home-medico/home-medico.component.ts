import { Component, OnInit } from '@angular/core';
import { ServicioService } from 'src/app/servicios/servicio.service';
import { BdaService } from 'src/app/servicios/bda.service';
import { empleado } from 'src/app/clases/empleado';
import { element } from 'protractor';

@Component({
  selector: 'app-home-medico',
  templateUrl: './home-medico.component.html',
  styleUrls: ['./home-medico.component.css']
})
export class HomeMedicoComponent implements OnInit {

  medicoLogeado:empleado;
  user;

  constructor(private service:ServicioService, private bda:BdaService) { 
    this.service.tomarUsuario().then(element=>{
      this.user=element;
      this.bda.devolverListadoEmpleados().subscribe(lista=>{
        lista.forEach(elementL=>{
          if(elementL.email.toLowerCase()==this.user.email.toLowerCase())
          this.medicoLogeado=elementL;
        })
      });
    });
  }

  ngOnInit(): void {
  }

}
