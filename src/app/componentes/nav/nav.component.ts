import { Component, OnInit, Input } from '@angular/core';
import { ServicioService } from 'src/app/servicios/servicio.service';



@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  
  listaE;
  listaU;
  user=null;
  @Input() logeado:boolean;
  @Input() tipoMedico:boolean;
  @Input() tipoAdmin:boolean;
  @Input() tipoPaciente:boolean;
  @Input() inicio:boolean;

  usuarioLista;
  constructor(private service:ServicioService) { 
    
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
    }else if (this.tipoPaciente==true){
      this.logeado=true;
      this.tipoMedico=false;
      this.tipoAdmin=false;
      this.inicio=false;
    }else{
      this.inicio=true;
      this.logeado=false;
    }

    
  }

  ngOnInit(): void {
    

    
  }  

}
