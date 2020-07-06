import { Component, OnInit, Input } from '@angular/core';
import { empleado } from 'src/app/clases/empleado';

@Component({
  selector: 'app-detalle-empleado',
  templateUrl: './detalle-empleado.component.html',
  styleUrls: ['./detalle-empleado.component.css']
})
export class DetalleEmpleadoComponent implements OnInit {

  @Input() empleado:empleado;

  constructor() {
    
   }

  ngOnInit(): void {
  }

}
