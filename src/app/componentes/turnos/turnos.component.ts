import { Component, OnInit } from '@angular/core';
import {ServicioService} from '../../servicios/servicio.service';


@Component({
  selector: 'app-turnos',
  templateUrl: './turnos.component.html',
  styleUrls: ['./turnos.component.css']
})
export class TurnosComponent implements OnInit {

  usuario;
  hayU:boolean;
  constructor( private serv:ServicioService) { 
    serv.tomarUsuario().then(res=>{
      this.usuario=res;      
    }).catch(err=>{
      alert(err);
    });
    this.hayU=false;
  }

  ngOnInit(): void {
    console.log(this.usuario);
    
    if(this.usuario!=null && this.usuario!="undefined")
    this.hayU=true;
    
  }

}
