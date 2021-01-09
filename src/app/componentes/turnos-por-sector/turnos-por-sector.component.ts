import { Component, Input, OnInit } from '@angular/core';
import { BdaService } from 'src/app/servicios/bda.service';
import { especialidad } from 'src/app/clases/especialidad';

import { ChartType, ChartOptions } from 'chart.js';
import { Label } from 'ng2-charts';
import * as pluginDataLabels from 'chartjs-plugin-datalabels';
import { turno } from 'src/app/clases/turno';

@Component({
  selector: 'app-turnos-por-sector',
  templateUrl: './turnos-por-sector.component.html',
  styleUrls: ['./turnos-por-sector.component.css']
})
export class TurnosPorSectorComponent implements OnInit {

  @Input() listadoTurnos:turno[];

  public pieChartLabels: Label[];
  public pieChartData: number[];
  public pieChartData2: number[];
  public pieChartData3: number[];
  listaLabels:Label[];
  listaDatos:number[];
  listaDatos2:number[];
  listaDatos3:number[];
  colores;

  listaEspecialidades:especialidad[];
  cargo=false;

  constructor(private bda:BdaService) { 
    let l:string[]=new Array();
    let datos:number[]=new Array();
    let datosEspecialistas:number[]=new Array();
    let datosPacientes:number[]=new Array();
    let col=new Array();
    this.bda.devolverListadoEspecialidades().subscribe(lista=>{
     

      this.listaEspecialidades=lista;
      lista.forEach(element=>{
        if(element.nombre=="Otra"){

        }else{
          l.push(element.nombre);
          datos.push(element.operaciones);
          let n=Math.floor(Math.random()*Math.random()*1000);
          let c=Math.floor(Math.random()*Math.random()*200);
          let x=Math.floor(Math.random()*Math.random()*600);
          let color='rgba('+n+','+c+','+x+',0.9)';
          
          col.push(color);
        }
        
        this.bda.devolverListadoEmpleados().subscribe(listaE=>{
          if(element.nombre!="Otra"){
            let cont=0;
            listaE.forEach(emple=>{
              emple.especialidades.forEach(espec=>{
                if(espec==element.nombre){
                  cont++;
                }           
              })
            })
            datosEspecialistas.push(cont);
          }
          
        })

        if(element.nombre!="Otra"){        
          let turnosF:string[]=new Array();
          this.listadoTurnos.forEach(turn=>{
            if(turn.especialidad==element.nombre && !turnosF.includes(turn.paciente.email)){
              turnosF.push(turn.paciente.email);
            }
          })
          datosPacientes.push(turnosF.length);
        }
      })
      this.colores=col;
      this.listaLabels=l;
      this.listaDatos=datos;
      this.listaDatos2=datosEspecialistas;
      this.listaDatos3=datosPacientes;
      
      

      
      this.escucha();
    })
    ;
    
    

    
  }

  public pieChartOptions: ChartOptions = {
    responsive: true,
    legend: {
      position: 'top',
    }/*,
    plugins: {
      datalabels: {
        formatter: (value, ctx) => {
          const label = ctx.chart.data.labels[ctx.dataIndex];
          return label;
        },
      },
    }*/
  };
 
  public pieChartType: ChartType = 'doughnut';
  public pieChartType2: ChartType = 'pie';
  public pieChartLegend = true;
  public pieChartPlugins = [pluginDataLabels];
  public pieChartColors = [
    {
      //backgroundColor: this.colores,
    },
  ];

  escucha() {
    if(this.listaEspecialidades.length>0)
    {
      this.pieChartData=this.listaDatos;
      this.pieChartData2=this.listaDatos2;
      this.pieChartData3=this.listaDatos3;
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
