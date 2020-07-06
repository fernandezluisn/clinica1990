import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { BdaService } from 'src/app/servicios/bda.service';
import { especialidad } from 'src/app/clases/especialidad';


@Component({
  selector: 'app-agregar-especialidad',
  templateUrl: './agregar-especialidad.component.html',
  styleUrls: ['./agregar-especialidad.component.css']
})
export class AgregarEspecialidadComponent implements OnInit {

  @Output() actualizar:EventEmitter<any>=new EventEmitter<any>();
  
  profesion:string;
  detallar:boolean;
  profesion2:string;

  listaEspecialidades;
  constructor(private bda:BdaService) {
    this.bda.devolverListadoEspecialidades().subscribe(lista => {
      this.listaEspecialidades = lista;       
      console.log(lista);
      });
   }

  ngOnInit(): void {
  }

  carg(){
    console.log(this.profesion);
    if(this.profesion=='Otra')
    {
      this.detallar=true;
    }else
    {
      this.detallar=false;
    }
  }

  agregar(){
    if(this.detallar){
      let e=new especialidad(this.profesion2);
      this.bda.createEspecialidad(e);
      this.actualizar.emit(e);
    }
    else{
      let e=new especialidad(this.profesion);
      this.actualizar.emit(e);
      console.log("se lanza"+e.nombre);
    }
  }

}
