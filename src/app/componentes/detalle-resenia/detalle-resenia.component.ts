import { Component, OnInit, Input } from '@angular/core';
import { turno } from 'src/app/clases/turno';
import { Router } from '@angular/router';

@Component({
  selector: 'app-detalle-resenia',
  templateUrl: './detalle-resenia.component.html',
  styleUrls: ['./detalle-resenia.component.css']
})
export class DetalleReseniaComponent implements OnInit {

  @Input() turno:turno;
  @Input() esPaciente:boolean;
  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  registrar(){
    this.router.navigate(["comentario/"+ this.turno.id]);
  }

}
