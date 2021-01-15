import { Component, OnInit,  } from '@angular/core';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import { Color, Label } from 'ng2-charts';
import * as pluginAnnotations from 'chartjs-plugin-annotation';
import { log } from 'src/app/clases/log';
import { BdaService } from 'src/app/servicios/bda.service';
import { ArchivosService } from 'src/app/servicios/archivos.service';



@Component({
  selector: 'app-lineas-logs',
  templateUrl: './lineas-logs.component.html',
  styleUrls: ['./lineas-logs.component.css']
})
export class LineasLogsComponent implements OnInit {

  
  
  cargo=false;

  ingresos:log[];
  
  constructor(private bdaMedicos:BdaService, private impresor:ArchivosService) {
    
    this.bdaMedicos.devolverListadoLogins().subscribe(
      listaB=>{
        this.ingresos=listaB;
        this.ingresos.sort((a,b) => Number(Date.parse(a.fecha.toString())) - Number(Date.parse(b.fecha.toString())));
        this.filtrarLogs(listaB);
      }      
    )
  }
  

  ngOnInit(): void {
    
  }

  excel(){    
    this.impresor.generarExcel(this.ingresos, "ingresos"+new Date().getTime());
  }

  pdf(){
      var element=document.getElementById("lineas");

      this.impresor.guardarImagenPdf(element, "ingresos");
  }

  filtrarLogs(logs:log[]){

    let enero=0;
    let feb=0;
    let mar=0;
    let abr=0;
    let may=0;
    let jun=0;
    let jul=0;
    let Aug=0;
    let Sep=0;
    let oct=0;
    let nov=0;
    let dec=0;
    logs.forEach(lo=>{
      let mes=lo.fecha.substr(4,3);
      
      switch(mes){
        case "Jan":
          enero++;
          break;
        case "Feb":
          feb++;
          break;
        case "Aug":
          Aug++;
          break; 
        case "Sep":
          Sep++;
          break; 
      }
      
    })
    this.lineChartData= [
      { data: [enero, feb, mar, abr, may, jun, jul,Aug,Sep,oct,nov,dec], label: 'Visitas mensuales' }    
    ];
    this.cargo=true;
  }



  public lineChartData: ChartDataSets[] = [
    //{ data: [this.enero, this.feb, this.mar, this.abr, this.may, 55, 40,33,44,10,11,12], label: 'Visitas mensuales' }    
  ];
  public lineChartLabels: Label[] = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto','Septiembre','Octubre','Noviembre', 'Diciembre'];
  public lineChartOptions: (ChartOptions & { annotation: any }) = {
    responsive: true,
    scales: {
      // We use this empty structure as a placeholder for dynamic theming.
      xAxes: [{}],
      yAxes: [
        {
          id: 'y-axis-0',
          position: 'left',
        }
      ]
    },
    annotation: {
      annotations: [
        {
          type: 'line',
          mode: 'vertical',
          scaleID: 'x-axis-0',
          value: 'March',
          borderColor: 'orange',
          borderWidth: 2,
          label: {
            enabled: true,
            fontColor: 'orange',
            content: 'LineAnno'
          }
        },
      ],
    },
  };
  public lineChartColors: Color[] = [    
    { // red
      backgroundColor: 'rgba(255,0,0,0.3)',
      borderColor: 'red',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    }
  ];
  public lineChartLegend = true;
  public lineChartType: ChartType = 'line';
  public lineChartPlugins = [pluginAnnotations];

}
