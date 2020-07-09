import { Component, OnInit } from '@angular/core';
import { ServicioService } from 'src/app/servicios/servicio.service';
import { BdaService } from 'src/app/servicios/bda.service';

@Component({
  selector: 'app-atencion-paciente',
  templateUrl: './atencion-paciente.component.html',
  styleUrls: ['./atencion-paciente.component.css']
})
export class AtencionPacienteComponent implements OnInit {

  txtResenia:string;
  user;
  medicoLogeado;
  descargo:boolean;
  constructor(private service:ServicioService, private bda:BdaService) { 
    this.service.tomarUsuario().then(element=>{
      this.user=element;
      this.bda.devolverListadoEmpleados().subscribe(lista=>{
        lista.forEach(elementL=>{
          if(elementL.email.toLowerCase()==this.user.email.toLowerCase())
          this.medicoLogeado=elementL;
          this.descargo=true;
        })
      });
    });
  }

  ngOnInit(): void {
    
  }

}
