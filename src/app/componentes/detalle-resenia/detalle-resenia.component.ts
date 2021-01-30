import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { turno } from 'src/app/clases/turno';
import { Router } from '@angular/router';
import { comentario } from 'src/app/clases/comentario';

@Component({
  selector: 'app-detalle-resenia',
  templateUrl: './detalle-resenia.component.html',
  styleUrls: ['./detalle-resenia.component.css']
})
export class DetalleReseniaComponent implements OnChanges {

  @Input() turno:turno;
  @Input() esPaciente:boolean;
  @Input() listadoComentarios:comentario[];

  existe=false;
  
  constructor(private router: Router) { 
    
  }
  ngOnChanges(changes: SimpleChanges): void {
    this.existe=false;
    this.listadoComentarios.forEach(element=>{
      if(element.idTurno==this.turno.id){
        this.existe=true;
      }
    })
  }

 

  registrar(){
    
    if(this.existe==false && this.turno.estado=="atendido")
    this.router.navigate(["comentario/"+ this.turno.id]);
    else if(this.turno.estado=="atendido")
    alert("Ya ha dejado un comentario de ese turno.");
    else
    alert("No puede dejar comentarios de un turno que no ha sido atendido");
  }

}
