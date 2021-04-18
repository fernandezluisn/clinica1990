import { Component, OnInit, Output, EventEmitter } from '@angular/core';

import { Router } from '@angular/router';

import {ServicioService} from '../../servicios/servicio.service';
import { BdaService } from 'src/app/servicios/bda.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  @Output() logeado: EventEmitter<any>=new EventEmitter<any>();
  email:string;
  pass:string;
  log:boolean;
  

  mostrar=false;
  mensaje="";
  constructor(private router: Router, private servicio:ServicioService, private bda:BdaService) {
    this.log=false;
    this.email="";
    this.pass="";
   }


  ngOnInit(): void {
    
  }

  onLogin(){  
    
    this.servicio.loginUser(this.email, this.pass).then
    ((res)=>{
      this.log=true;    
      this.logeado.emit(this.log);
      this.bda.guardarLogin(this.email);
      this.bda.devolverListadoEmpleados().subscribe(listaE=>{
        listaE.forEach(element=>{
          if(element.email.toLowerCase()==this.email.toLowerCase()){  
            this.bda.guardarLogin(this.email);        
            this.router.navigate(['homeMedico']);
          }
          
        })
      })
      this.bda.devolverListadoAdministradores().subscribe(lista=>
        {
          lista.forEach(elementA=>{
            if(elementA.email.toLowerCase()==this.email.toLowerCase())
            this.router.navigate(["homeAdmin"]);
          })
        }
        )
      this.router.navigate(["turnos"]);
      
    }).catch(error=>{      
      this.mostrar=true;
      if(error.message=="The email address is badly formatted.")
      this.mensaje="El formato del correo electrónico no es el correcto.";  
      else if(error.message=="The password is invalid or the user does not have a password.")
      this.mensaje="La contraseña ingresada no es correcta o el usuario no tiene una.";  
      else 
      this.mensaje=error.message    
    }
    );
    
  }

  pacienteUno(){

    this.servicio.loginUser("fernandezluisn@gmail.com","123456").then(res=>{
      this.bda.guardarLogin("fernandezluisn@gmail.com"); 
      this.router.navigate(['turnos']);
    })
    
  }

  pacienteDos(){
    this.servicio.loginUser("cosme@gmail.com","123456").then(res=>{
      this.router.navigate(['turnos']);
      this.bda.guardarLogin("cosme@gmail.com"); 
    })
  }

  admin(){
    this.servicio.loginUser("admin2@gmail.com","123456").then(res=>{
      this.router.navigate(['homeAdmin']);
      this.bda.guardarLogin("admin2@gmail.com"); 
    })
  }

  medicoUno(){
    this.servicio.loginUser("mdiaz@gmail.com","123456").then(res=>{
      this.bda.guardarLogin("mdiaz@gmail.com"); 
      this.router.navigate(['homeMedico']);
    })
  }

  medicoDos(){
    this.servicio.loginUser("juanc@gmail.com","123456").then(res=>{
      this.bda.guardarLogin("juanc@gmail.com"); 
      this.router.navigate(['homeMedico']);
    })
  }

  cerrarPopup(mostrar2:boolean){
    this.mostrar=mostrar2;
  }

 
}
