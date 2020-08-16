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

  listaEspecialidades:especialidad[];
  constructor(private bda:BdaService) {
    this.bda.devolverListadoEspecialidades().subscribe(lista => {
      this.listaEspecialidades = lista;       
      console.log(lista);
      });
   }

  ngOnInit(): void {
  }

  carg(){
    
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
      let e=new especialidad(this.profesion2, 0);
      this.bda.createEspecialidad(e);
      this.actualizar.emit(e);
    }
    else{
      let e;
      this.listaEspecialidades.filter(element => {
        if(this.profesion==element.nombre)
        e=element;
       
      });
      this.actualizar.emit(e);
     
    }
  }

}
