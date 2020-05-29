import { Component, OnInit, Output, EventEmitter } from '@angular/core';

import { Router } from '@angular/router';

import {ServicioService} from '../../servicio.service';


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
  constructor(private router: Router, private servicio:ServicioService) {
    this.log=false;
    this.email="";
    this.pass="";
   }


  ngOnInit(): void {
    
  }

  onLogin(){
    console.log(this.email);
    
    this.servicio.loginUser(this.email, this.pass).then
    ((res)=>{
      this.log=true;    
      this.logeado.emit(this.log);
      this.router.navigate(['turnos']);
      
    }).catch(error=>{
      console.log(error.message);      
    }
    );
    
  }

  onLogOut(){
    this.servicio.logOutUser();
    this.log=false;
    this.logeado.emit(this.log);
  }
}
