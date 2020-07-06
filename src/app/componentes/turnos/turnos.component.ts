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
  usuarioLista;

  fecha:Date;
  hora:string;

  hoy;
  quinceDias;
  v1:boolean;
  v2:boolean;
  v3:boolean;
  
  listadoPacientes;

  events: any[];

  options: any;

  constructor( private serv:ServicioService, private bda:BdaService) { 
    this.serv.tomarUsuario().then(res=>{
      this.usuario=res;   
      this.bda.devolverListadoPacientes().subscribe(lista=>{
        lista.forEach(element=>{
          if(element.id.toLowerCase()==this.usuario.email.toLowerCase())
          this.usuarioLista=element;
        })

      })
      console.log(this.usuario.uid);   
    }).catch(err=>{
      alert(err);
    });

    this.hoy=new Date();
    this.quinceDias=new Date(this.hoy.getFullYear(), this.hoy.getMonth(), this.hoy.getDate()+15);
    console.log(this.quinceDias);
    this.v1=false;
    this.v2=false;
    this.v3=false;
  }

  ngOnInit(): void {

    this.bda.devolverListadoPacientes().subscribe(lista => {
      this.listadoPacientes = lista;
      console.log(this.hoy);
    })
    console.log("lista componente "+ this.listadoPacientes);
    console.log(this.bda.listaPacientes);
    
  
    
  }

  mostrarBoton(){
    if(this.v1==true && this.v2==true){
      this.v3=true;
    }
  }

  mostrarFecha(){
    console.log(this.fecha);
    this.v1=true;
    this.mostrarBoton();
  }

  mostrarHora(){
    console.log(this.hora);
    this.v2=true;
    this.mostrarBoton();
  }

  subirTurno(){

  }

}
