import { Component, OnInit } from '@angular/core';
import { ServicioService } from 'src/app/servicios/servicio.service';
import { BdaService } from 'src/app/servicios/bda.service';
import { element } from 'protractor';
import { empleado } from 'src/app/clases/empleado';
import { admin } from 'src/app/clases/admin';

@Component({
  selector: 'app-horario-medicos',
  templateUrl: './horario-medicos.component.html',
  styleUrls: ['./horario-medicos.component.css']
})
export class HorarioMedicosComponent implements OnInit {

  medicoElegido:empleado;
  adminLogeado: admin;
  hayMedico:boolean;
  listadoEspecialistas;
  user;
  descargo:boolean;

  constructor(private service: ServicioService, private bda:BdaService) {
    this.hayMedico=false;

    this.bda.devolverListadoEmpleados().subscribe(lista=>{
      this.listadoEspecialistas=lista;
    });

    this.service.tomarUsuario().then(element=>{
      this.user=element;
      console.log(this.user.email);
      this.bda.devolverListadoAdministradores().subscribe(lista=>{
        lista.forEach(elementB=>{
          if(element.email.toLowerCase()===elementB.email.toLowerCase())
          this.adminLogeado=elementB;
          this.descargo=true;
        })
      })
    })
   }

  ngOnInit(): void {
  }

  agregar(espec){

    let a=espec.nombre;
    let yaTieneEspecialidad=false;

    this.medicoElegido.especialidades.forEach(element=>{
      if(element.toLowerCase()==a.toLowerCase()){
        yaTieneEspecialidad=true
      }
      
    })
    if(yaTieneEspecialidad==false){
      this.medicoElegido.especialidades.push(espec.nombre);
      console.log(this.medicoElegido.especialidades);
      this.bda.updateUsuario(this.medicoElegido);
      this.bda.updateEmpleado(this.medicoElegido);
    }else{
      alert("A este médico ya se le asignó esa especialidad.");
    }
    
  }

  tomarMedico(medico){
    this.medicoElegido=medico;
    this.hayMedico=true;
  }

}
