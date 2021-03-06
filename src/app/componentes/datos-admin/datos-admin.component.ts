import { Component, OnInit } from '@angular/core';
import { TurnosService } from 'src/app/servicios/turnos.service';
import { BdaService } from 'src/app/servicios/bda.service';
import { turno } from 'src/app/clases/turno';
import { empleado } from 'src/app/clases/empleado';
import { log } from 'src/app/clases/log';
import { paciente } from 'src/app/clases/paciente';
import { ServicioService } from 'src/app/servicios/servicio.service';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-datos-admin',
  templateUrl: './datos-admin.component.html',
  styleUrls: ['./datos-admin.component.css']
})
export class DatosAdminComponent implements OnInit {

  vis=true; 
  tur=false;
  med=false;
  sec=false;
  enc=false;

  cargo=false;
  listadoTurnos:turno[];
  listadoEmpleados:empleado[];
  listadoLogins:log[];
  listadoPacientes:paciente[];
  
  
  
  constructor(private bda:TurnosService, private bdaMedicos:BdaService, private service:ServicioService, private router:Router, private spin:NgxSpinnerService) {
    
    this.bda.devolverListadoTurnos().subscribe(lista=>{      
      this.bdaMedicos.devolverListadoPacientes().subscribe(listaP=>this.listadoPacientes=listaP)
      this.listadoTurnos=lista;
      this.bdaMedicos.devolverListadoEmpleados().subscribe(listaE=>{
        this.listadoEmpleados=listaE;
        this.bdaMedicos.devolverListadoLogins().subscribe(
          listaB=>{
            this.listadoLogins=listaB;
            
            this.cargo=true;
          }
        )
        
        
        
      })
    })
   }

  ngOnInit(): void {
    this.spinner();
  }

  verEnc(){
    this.vis=false; 
    this.tur=false;
    this.med=false;
    this.sec=false;
    this.enc=true;
  }

  verVis(){
    this.vis=true; 
    this.tur=false;
    this.med=false;
    this.sec=false;
    this.enc=false;
  }

  verTurnos(){
    this.vis=false; 
    this.tur=true;
    this.med=false;
    this.sec=false;
    this.enc=false;
  }

  verMed(){
    this.vis=false;
    this.tur=false;
    this.med=true;
    this.sec=false;
    this.enc=false;
  }

  verSec(){
    this.vis=false; 
    this.tur=false;
    this.med=false;
    this.sec=true;
    this.enc=false;
  }

  cerrar(){    
    this.service.logOutUser();    
    this.router.navigate(['']);
  }

  spinner():void{
    this.spin.show();
    setTimeout(()=>{
      this.spin.hide();
    }, 4000)
  }
}
