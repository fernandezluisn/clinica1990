import { Component, OnInit } from '@angular/core';
import { TurnosService } from 'src/app/servicios/turnos.service';
import { turno } from 'src/app/clases/turno';

//graficos
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import * as pluginDataLabels from 'chartjs-plugin-datalabels';
import { Label } from 'ng2-charts';

@Component({
  selector: 'app-turnos-por-dia',
  templateUrl: './turnos-por-dia.component.html',
  styleUrls: ['./turnos-por-dia.component.css']
})
export class TurnosPorDiaComponent implements OnInit {

 
  díaFinal;
  diaInicial;

  lunes;
  martes;
  miercoles;
  jueves;
  viernes;
  sabado;
  domingo=0;
  
  listadoTurnos:turno[];
  listaFiltrada:turno[];


 

  constructor(private bda:TurnosService) { 
    
    let hoy=new Date();
    this.diaInicial=new Date(hoy.getFullYear(), hoy.getMonth(), hoy.getDate());
    this.díaFinal=new Date(hoy.getFullYear(), hoy.getMonth(), hoy.getDate()+6);
    
    
    
    this.bda.devolverListadoTurnos().subscribe(lista=>{
      this.listadoTurnos=lista;
      this.filtrarListado(lista);
    });
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
  public barChartLabels: Label[] = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'];
  public barChartType: ChartType = 'bar';
  public barChartLegend = true;
  public barChartPlugins = [pluginDataLabels];

  public barChartData: ChartDataSets[]= [
    { data: [this.lunes, this.martes, this.miercoles, this.jueves, this.viernes, this.sabado, this.domingo], label: 'Cantidad de turnos Por día de la semana' }    
  ];
 

  ngOnInit(): void {
    
  }

  filtrarListado(lista:turno[]){
    let lT=new Array();
    lista.filter(element=>{
      if(Number(Date.parse(element.fecha.toString()))>=Number(Date.parse(this.diaInicial.toString())) &&  
      Number(Date.parse(element.fecha.toString()))<=Number(Date.parse(this.díaFinal.toString()))){        
        lT.push(element);
      }
    })

    let lu=0;
    let ma=0;
    let mi=0;
    let ju=0;
    let vi=0;
    let sa=0;
    
    lT.forEach(element=>{

      let date= new Date(element.fecha);
      

      
      switch(date.getDay()){
        case 0:
        lu++;
        break;
        case 1:
        ma++;
        break;
        case 2:
        mi++;
        break;
        case 3:
        ju++;
        break;
        case 4:
        vi++;
        break;
        case 5:
        sa++;
        break;
      }
    })

    

    this.lunes=lu;
    this.martes=ma;
    this.miercoles=mi;
    this.jueves=ju;
    this.viernes=vi;
    this.sabado=sa;

    this.barChartData= [
      { data: [this.lunes, this.martes, this.miercoles, this.jueves, this.viernes, this.sabado, this.domingo], label: 'Cantidad de turnos Por día de la semana' }    
    ];

  }

}
