import { Component, OnInit } from '@angular/core';
import { BdaService } from 'src/app/servicios/bda.service';
import { especialidad } from 'src/app/clases/especialidad';

import { ChartType, ChartOptions } from 'chart.js';
import { Label } from 'ng2-charts';
import * as pluginDataLabels from 'chartjs-plugin-datalabels';
import { element } from 'protractor';

@Component({
  selector: 'app-turnos-por-sector',
  templateUrl: './turnos-por-sector.component.html',
  styleUrls: ['./turnos-por-sector.component.css']
})
export class TurnosPorSectorComponent implements OnInit {


  public pieChartLabels: Label[];
  public pieChartData: number[];
  listaLabels:Label[];
  listaDatos:number[];
  colores;

  listaEspecialidades:especialidad[];
  cargo=false;

  constructor(private bda:BdaService) { 
    let l:string[]=new Array();
    let datos:number[]=new Array();
    let col=new Array();
    this.bda.devolverListadoEspecialidades().subscribe(lista=>{
     

      this.listaEspecialidades=lista;
      lista.forEach(element=>{
        if(element.nombre=="Otra"){

        }else{
          l.push(element.nombre);
          datos.push(element.operaciones);
          let n=Math.floor(Math.random()*1000);
          let c=Math.floor(Math.random()*1000);
          let x=Math.floor(Math.random()*1000);
          let color='rgba('+n+','+c+','+x+',0.9)';
          console.log(color);
          col.push(color);
        }
        
      })
      this.colores=col;
      this.listaLabels=l;
      this.listaDatos=datos;
     
      this.escucha();
    })
    ;
    
    

    
  }

  public pieChartOptions: ChartOptions = {
    responsive: true,
    legend: {
      position: 'top',
    },
    plugins: {
      datalabels: {
        formatter: (value, ctx) => {
          const label = ctx.chart.data.labels[ctx.dataIndex];
          return label;
        },
      },
    }
  };
 
  public pieChartType: ChartType = 'pie';
  public pieChartLegend = true;
  public pieChartPlugins = [pluginDataLabels];
  public pieChartColors = [
    {
      backgroundColor: this.colores,
    },
  ];

  escucha() {
    if(this.listaEspecialidades.length>0)
    {
      this.pieChartData=this.listaDatos;
      this.pieChartLabels= this.listaLabels;
      this.cargo=true;

      this.pieChartColors = [
        {
          backgroundColor: this.colores,
        },
      ];
    }    
    else
    this.cargo=false;

   
}

  ngOnInit(): void {
  }

}
