import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { empleado } from 'src/app/clases/empleado';


@Component({
  selector: 'app-detalle-empleado',
  templateUrl: './detalle-empleado.component.html',
  styleUrls: ['./detalle-empleado.component.css']
})
export class DetalleEmpleadoComponent implements OnInit {

  @Input() empleado:empleado;
  @Output() saleEmp:EventEmitter<any>=new EventEmitter<any>();
  @Input() esAdmin=false;

  constructor() {
    
   }

  ngOnInit(): void {
  }

  elegir(empleado){
    this.saleEmp.emit(empleado);
  }

}
