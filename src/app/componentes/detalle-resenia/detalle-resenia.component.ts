import { Component, OnInit, Input } from '@angular/core';
import { turno } from 'src/app/clases/turno';
import { Router } from '@angular/router';
import { comentario } from 'src/app/clases/comentario';
import { element } from 'protractor';

@Component({
  selector: 'app-detalle-resenia',
  templateUrl: './detalle-resenia.component.html',
  styleUrls: ['./detalle-resenia.component.css']
})
export class DetalleReseniaComponent implements OnInit {

  @Input() turno:turno;
  @Input() esPaciente:boolean;
  @Input() listadoComentarios:comentario[];

  existe=false;
  
  constructor(private router: Router) { 
    
  }

  ngOnInit(): void {
    this.listadoComentarios.forEach(element=>{
      if(element.idTurno==this.turno.id){
        this.existe=true;
      }
    })
  }

  registrar(){
    if(this.existe==false)
    this.router.navigate(["comentario/"+ this.turno.id]);
    else
    alert("Ya ha dejado un comentario de ese turno.");
  }

}
