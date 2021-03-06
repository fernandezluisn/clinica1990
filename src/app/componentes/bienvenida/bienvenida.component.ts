import { Component} from '@angular/core';
import { ServicioService } from 'src/app/servicios/servicio.service';
import { BdaService } from 'src/app/servicios/bda.service';


@Component({
  selector: 'app-bienvenida',
  templateUrl: './bienvenida.component.html',
  styleUrls: ['./bienvenida.component.css']
})
export class BienvenidaComponent{

  usuario;
  esEmpleado=false;
  esPaciente=false;
  estaLogeado=false;
  esAdmin=false;
  constructor(private serv:ServicioService, private bda:BdaService) { 
    this.serv.tomarUsuario().then(res=>{
      
      this.usuario=res;   

      if(this.usuario)
      {
        this.bda.devolverListadoPacientes().subscribe(lista=>{
          lista.forEach(element=>{
            if(element.email.toLowerCase()==this.usuario.email.toLowerCase()){
              this.estaLogeado=true;
              this.esEmpleado=false;
              this.esPaciente=true;
              this.esAdmin=false;
            }
          })
        })
  
        this.bda.devolverListadoAdministradores().subscribe(lista=>{
          lista.forEach(element=>{
            if(element.email.toLowerCase()==this.usuario.email.toLowerCase()){
              this.estaLogeado=true;
              this.esEmpleado=false;
              this.esPaciente=false;
              this.esAdmin=true;
            }
          })
        })
        
        this.bda.devolverListadoEmpleados().subscribe(lista=>{
          
          lista.forEach(element=>{
            if(element.email.toLowerCase()==this.usuario.email.toLowerCase()){
              this.estaLogeado=true;
              this.esEmpleado=true;
              this.esPaciente=false;
              this.esAdmin=false;
            }
          })
          
          
        });
      }else{
        this.esPaciente=true;
        this.estaLogeado=false;
      }
    
    })
  }

  

}
