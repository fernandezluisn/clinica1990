import { Component, OnInit } from '@angular/core';
import { ServicioService } from 'src/app/servicios/servicio.service';
import { isNull } from 'util';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  listaE;
  listaU;
  user;
  logeado:boolean;
  constructor(private service:ServicioService) { 
    
    this.user=this.service.tomarUsuario().then(res=>this.user=res);

    if(isNull(this.user) || this.user=="undefined")
    this.logeado=true;
    else
    this.logeado=false;
  }

  ngOnInit(): void {
    

    if(isNull(this.user) || this.user=="undefined")
    this.logeado=true;
    else
    this.logeado=false;

    console.log("hay usuario nav "+this.user);
  }

  cerrar(){
    this.service.logOutUser();
  }

}
