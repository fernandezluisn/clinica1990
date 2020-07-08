import { Component, OnInit, Output, EventEmitter } from '@angular/core';

import { Router } from '@angular/router';

import {ServicioService} from '../../servicios/servicio.service';
import { BdaService } from 'src/app/servicios/bda.service';
import { element } from 'protractor';


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
  constructor(private router: Router, private servicio:ServicioService, private bda:BdaService) {
    this.log=false;
    this.email="";
    this.pass="";
   }


  ngOnInit(): void {
    
  }

  onLogin(){
    console.log(this.email);
    let v=false;
    this.servicio.loginUser(this.email, this.pass).then
    ((res)=>{
      this.log=true;    
      this.logeado.emit(this.log);
      this.bda.devolverListadoPacientes().subscribe(lista=>{
        lista.forEach(element=>{
          if(element.email.toLowerCase()==this.email.toLowerCase())
          this.router.navigate(['turnos']);
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
      this.router.navigate(["homeMedico"]);
      
    }).catch(error=>{
      alert(error.message);      
    }
    );
    
  }

  onLogOut(){
    this.servicio.logOutUser();
    this.log=false;
    this.logeado.emit(this.log);
  }
}
