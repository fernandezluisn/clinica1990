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
  @Input() logeado:boolean;
  @Input() tipoMedico:boolean;
  @Input() tipoAdmin:boolean;
  @Input() tipoPaciente:boolean;
  @Input() inicio:boolean;

  usuarioLista;
  constructor(private service:ServicioService, private router: Router) { 
    
    this.service.tomarUsuario().then(res=>{
      this.user=res;
      
    
    })

    

    if(this.tipoMedico==true){
      this.logeado=true;
      this.tipoAdmin=false;
      this.tipoPaciente=false;
      this.inicio=false;
    }else if(this.tipoAdmin==true){
      this.logeado=true;
      this.tipoMedico=false;
      this.tipoPaciente=false;
      this.inicio=false;
    }else{
      this.tipoPaciente=true;
      this.inicio=true;
    }

    
  }

  ngOnInit(): void {
    

    
  }

  cerrar(){
    this.service.logOutUser();
    this.logeado=false;
    this.router.navigate(['']);
  }

}
