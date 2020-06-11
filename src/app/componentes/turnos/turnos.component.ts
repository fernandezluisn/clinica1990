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
  hayU:boolean;
  listadoPacientes;

  constructor( private serv:ServicioService, private bda:BdaService) { 
    serv.tomarUsuario().then(res=>{
      this.usuario=res;      
    }).catch(err=>{
      alert(err);
    });
    this.hayU=false;
  }

  ngOnInit(): void {

    this.bda.devolverListado().subscribe(lista => {
      this.listadoPacientes = lista;
    })
    console.log(this.listadoPacientes);
    console.log(this.bda.listaPacientes);
    
    if(this.usuario!=null && this.usuario!="undefined")
    this.hayU=true;
    
  }

}
