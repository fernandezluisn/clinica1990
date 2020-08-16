import { Component, OnInit } from '@angular/core';
import { TurnosService } from 'src/app/servicios/turnos.service';
import { BdaService } from 'src/app/servicios/bda.service';
import { turno } from 'src/app/clases/turno';
import { empleado } from 'src/app/clases/empleado';
import { log } from 'src/app/clases/log';

@Component({
  selector: 'app-datos-admin',
  templateUrl: './datos-admin.component.html',
  styleUrls: ['./datos-admin.component.css']
})
export class DatosAdminComponent implements OnInit {

  cargo=false;
  listadoTurnos:turno[];
  listadoEmpleados:empleado[];
  listadoLogins:log[];
  
  
  constructor(private bda:TurnosService, private bdaMedicos:BdaService) {
    this.bda.devolverListadoTurnos().subscribe(lista=>{
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

}
