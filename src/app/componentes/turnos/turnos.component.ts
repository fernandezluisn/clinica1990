import { Component, OnInit } from '@angular/core';
import {ServicioService} from '../../servicios/servicio.service';
import {BdaService} from '../../servicios/bda.service';


@Component({
  selector: 'app-turnos',
  templateUrl: './turnos.component.html',
  styleUrls: ['./turnos.component.css']
})
export class TurnosComponent implements OnInit {

  usuario;
  
  listadoPacientes;

  constructor( private serv:ServicioService, private bda:BdaService) { 
    serv.tomarUsuario().then(res=>{
      this.usuario=res;      
    }).catch(err=>{
      alert(err);
    });
    console.log(this.usuario.uid);
  }

  ngOnInit(): void {

    this.bda.devolverListadoPacientes().subscribe(lista => {
      this.listadoPacientes = lista;
      console.log(lista);
    })
    console.log("lista componente "+ this.listadoPacientes);
    console.log(this.bda.listaPacientes);
    
    
    
  }

}
