import { Component, OnInit } from '@angular/core';
import { TurnosService } from 'src/app/servicios/turnos.service';
import { BdaService } from 'src/app/servicios/bda.service';
import { turno } from 'src/app/clases/turno';
import { empleado } from 'src/app/clases/empleado';
import { log } from 'src/app/clases/log';
import { paciente } from 'src/app/clases/paciente';

@Component({
  selector: 'app-datos-admin',
  templateUrl: './datos-admin.component.html',
  styleUrls: ['./datos-admin.component.css']
})
export class DatosAdminComponent implements OnInit {

  vis=false; //no tagea
  tur=true;
  med=false;
  sec=false;

  cargo=false;
  listadoTurnos:turno[];
  listadoEmpleados:empleado[];
  listadoLogins:log[];
  listadoPacientes:paciente[];
  
  
  constructor(private bda:TurnosService, private bdaMedicos:BdaService) {
    this.bda.devolverListadoTurnos().subscribe(lista=>{
      this.bdaMedicos.devolverListadoPacientes().subscribe(listaP=>this.listadoPacientes=listaP)
      this.listadoTurnos=lista;
      this.bdaMedicos.devolverListadoEmpleados().subscribe(listaE=>{
        this.listadoEmpleados=listaE;
        this.bdaMedicos.devolverListadoLogins().subscribe(
          listaB=>{
            this.listadoLogins=listaB;
            console.log(this.listadoLogins);
            this.cargo=true;
          }
        )
        
        
        
      })
    })
   }

  ngOnInit(): void {
  }

  verVis(){
    this.vis=true; //no tagea
    this.tur=false;
    this.med=false;
    this.sec=false;
  }

  verTurnos(){
    this.vis=false; //no tagea
    this.tur=true;
    this.med=false;
    this.sec=false;
  }

  verMed(){
    this.vis=false; //no tagea
    this.tur=false;
    this.med=true;
    this.sec=false;
  }

  verSec(){
    this.vis=false; //no tagea
    this.tur=false;
    this.med=false;
    this.sec=true;
  }
}
