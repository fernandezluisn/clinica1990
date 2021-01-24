import { Component, OnInit } from '@angular/core';
import { BdaService } from 'src/app/servicios/bda.service';
import { empleado } from 'src/app/clases/empleado';
import { ServicioService } from 'src/app/servicios/servicio.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-habilitar-usuarios',
  templateUrl: './habilitar-usuarios.component.html',
  styleUrls: ['./habilitar-usuarios.component.css']
})
export class HabilitarUsuariosComponent implements OnInit {

  listaFiltrada;
  medicoElegido:empleado;
  hayMedico=false;
  hay=false;

  constructor(private bda:BdaService, private service:ServicioService, private router:Router) {

    this.actualizarLista();
    
   }

  ngOnInit(): void {
  }

  tomarMedico(medico){
    this.medicoElegido=medico;   
    this.hayMedico=true;
  }

  actualizarLista(){
    let b:empleado[]=null;
    b=new Array();
    this.bda.devolverListadoEmpleados().subscribe(lista=>{
      lista.filter(element=>{
        if(element.aprobadoPorAdmin==false)
        b.push(element);
      });
    });
    
    if(b.length>0)
    this.hay=true;
    else
    this.hay=false;

    this.listaFiltrada=b;
  }

  cerrar(){    
    this.service.logOutUser();    
    this.router.navigate(['']);
  }

  habilitar(medico){
    this.medicoElegido.aprobadoPorAdmin=true;
    try{
      this.bda.updateEmpleado(this.medicoElegido);
      this.bda.updateUsuario(this.medicoElegido);
      alert("Se ha habilitado correctamente");
      this.actualizarLista();
    }catch(err){
      alert(err);
    }
  }

}
