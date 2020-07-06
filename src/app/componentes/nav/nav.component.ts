import { Component, OnInit, Input } from '@angular/core';
import { ServicioService } from 'src/app/servicios/servicio.service';
import { isNull } from 'util';
import { BdaService } from 'src/app/servicios/bda.service';


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

  usuarioLista;
  constructor(private service:ServicioService, private bda:BdaService) { 
    
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
  }

}
