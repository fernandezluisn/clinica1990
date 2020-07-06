import { Component, OnInit, Input } from '@angular/core';
import { ServicioService } from 'src/app/servicios/servicio.service';
import { isNull } from 'util';

import { Router } from '@angular/router';


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
  @Input() tipo:boolean;

  usuarioLista;
  constructor(private service:ServicioService, private router: Router) { 
    
    this.service.tomarUsuario().then(res=>{
      this.user=res;
      if(isNull(this.user) || this.user=="undefined")
      this.logeado=true;
      else
      this.logeado=false;
    
    })

    
  }

  ngOnInit(): void {
    

    
  }

  cerrar(){
    this.service.logOutUser();
    this.logeado=false;
    this.router.navigate(['']);
  }

}
