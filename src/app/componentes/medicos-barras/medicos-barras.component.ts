import { Component, OnInit } from '@angular/core';
import { TurnosService } from 'src/app/servicios/turnos.service';
import { turno } from 'src/app/clases/turno';
import { BdaService } from 'src/app/servicios/bda.service';
import { empleado } from 'src/app/clases/empleado';

//graficos
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import * as pluginDataLabels from 'chartjs-plugin-datalabels';
import { Label } from 'ng2-charts';

@Component({
  selector: 'app-medicos-barras',
  templateUrl: './medicos-barras.component.html',
  styleUrls: ['./medicos-barras.component.css']
})
export class MedicosBarrasComponent implements OnInit {

  lapso:string;
  diaInicial:Date;
  diaFinal:Date;

  cargo=false;

  lapsos:string[]=["la última semana","las últimas dos semanas","el último mes"];

  listadoTurnos:turno[];
  listadoTurnosFiltrado:turno[];

  listadoEmpleados:empleado[];

  constructor(private bda:TurnosService, private bdaMedicos:BdaService) { 
    this.lapso="la última semana";

    this.bda.devolverListadoTurnos().subscribe(lista=>{
      this.listadoTurnos=lista;
      this.bdaMedicos.devolverListadoEmpleados().subscribe(listaE=>{
        this.listadoEmpleados=listaE;
        this.carg();
        
      })
    })

   

    
  }

  public barChartOptions: ChartOptions = {
    responsive: true,
    // We use these empty structures as placeholders for dynamic theming.
    scales: { xAxes: [{}], yAxes: [{}] },
    plugins: {
      datalabels: {
        anchor: 'end',
        align: 'end',
      }
    }
  };
  public barChartLabels: Label[] = ["0"];
  public barChartType: ChartType = 'bar';
  public barChartLegend = true;
  public barChartPlugins = [pluginDataLabels];

  public barChartData: ChartDataSets[]= [{ data: [0], label: 'Cantidad de turnos por médico' } ];

  ngOnInit(): void {
  }

  carg(){
    let hoy=new Date();
    this.diaInicial=new Date(hoy.getFullYear(), hoy.getMonth(), hoy.getDate());
    switch(this.lapso){
      case "la última semana":        
         this.diaFinal=new Date(hoy.getFullYear(), hoy.getMonth(), hoy.getDate()-6);
        break;
      case "las últimas dos semanas":
        this.diaFinal=new Date(hoy.getFullYear(), hoy.getMonth(), hoy.getDate()-13);
        break;
      case "el último mes":
        this.diaFinal=new Date(hoy.getFullYear(), hoy.getMonth(), hoy.getDate()-29);
        break;
        
    }

    this.filtrarListado(this.listadoTurnos);
    let numeros=new Array();

    let nombres=new Array();
    
    this.listadoEmpleados.forEach(empleado=>{
      nombres.push(empleado.nombre+" "+empleado.apellido);
      empleado.cantidadTurnos=0;

      this.listadoTurnosFiltrado.forEach(turno=>{
        if(turno.empleado.email.toLowerCase()==empleado.email.toLowerCase()){
          empleado.cantidadTurnos++;
        }
      })

      numeros.push(empleado.cantidadTurnos);
      console.log(empleado.email+" "+empleado.cantidadTurnos);
    })

    let s=[{ data: numeros, label: 'Cantidad de turnos por médico durante '+this.lapso } ];

    this.barChartData=s;
    this.barChartLabels=nombres;

    this.cargo=true;
  }

  filtrarListado(lista:turno[]){
    let lT=new Array();
    lista.filter(element=>{
      if(Number(Date.parse(element.fecha.toString()))<=Number(Date.parse(this.diaInicial.toString())) &&  
      Number(Date.parse(element.fecha.toString()))>=Number(Date.parse(this.diaFinal.toString()))){        
        lT.push(element);
      }
    })  

    this.listadoTurnosFiltrado=lT;
  }

}
