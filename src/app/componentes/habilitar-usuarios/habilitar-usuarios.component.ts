import { Component, OnInit } from '@angular/core';
import { BdaService } from 'src/app/servicios/bda.service';
import { element } from 'protractor';
import { empleado } from 'src/app/clases/empleado';

@Component({
  selector: 'app-habilitar-usuarios',
  templateUrl: './habilitar-usuarios.component.html',
  styleUrls: ['./habilitar-usuarios.component.css']
})
export class HabilitarUsuariosComponent implements OnInit {

  listaFiltrada;
  medicoElegido:empleado;
  hayMedico=false;

  constructor(private bda:BdaService) {

    this.actualizarLista();
    
   }

  ngOnInit(): void {
  }

  tomarMedico(medico){
    this.medicoElegido=medico;   
    this.hayMedico=true;
  }

  actualizarLista(){
    this.listaFiltrada=new Array();
    this.bda.devolverListadoEmpleados().subscribe(lista=>{
      lista.filter(element=>{
        if(element.aprobadoPorAdmin==false)
        this.listaFiltrada.push(element);
      });
    });
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
