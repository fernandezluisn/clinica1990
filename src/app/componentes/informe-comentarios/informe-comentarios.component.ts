import { Component, OnInit } from '@angular/core';
import { comentario } from 'src/app/clases/comentario';
import { TurnosService } from 'src/app/servicios/turnos.service';

//graficos
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import * as pluginDataLabels from 'chartjs-plugin-datalabels';
import { Label } from 'ng2-charts';

@Component({
  selector: 'app-informe-comentarios',
  templateUrl: './informe-comentarios.component.html',
  styleUrls: ['./informe-comentarios.component.css']
})
export class InformeComentariosComponent implements OnInit {

  cargo=false;
  listaC:comentario[];
  constructor(private bda:TurnosService) {
    this.bda.devolverListadoComentarios().subscribe(listaC=>{
      this.listaC=listaC;
      this.cargarBarras();
    } );
      
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
  public barChartLabels2: Label[] = ["0"];
  public barChartType: ChartType = 'bar';
  public barChartLegend = true;
  public barChartPlugins = [pluginDataLabels];

  public barChartData: ChartDataSets[]= [];
  public barChartData2: ChartDataSets[]= [];

  ngOnInit(): void {
  }

  cargarBarras(){
    let fam=0;
    let amig=0;
    let trab=0;

    let b1=0;
    let b5=0;
    let b4=0;
    let b3=0;
    let b2=0;
    let n=this.listaC.length;
    this.listaC.forEach(coment=>{
      if(coment.preg4[0])
      fam++;
      if(coment.preg4[1])
      amig++;
      if(coment.preg4[2])
      trab++;

      switch(coment.preg2){
        case"Muy bueno":
        b1++;
        break;
        case"Bueno":
        b2++;
        break;
        case"Regular":
        b3++;
        break;
        case"Malo":
        b4++;
        break;
        case"Muy malo":
        b5++;
        break;
      }

    });

    let n1=(fam/n)*100;
    let n2=(amig/n)*100;
    let n3=(trab/n)*100;

    

    let s=[{ data: [n1], label: 'familiares'},
    { data: [n2], label: 'amigos'},
    { data: [n3], label: 'compañeros de trabajo'},
   ];

   let s2=[{ data: [b1], label: 'Muy bueno'},
    { data: [b2], label: 'Bueno'},
    { data: [b3], label: 'Regular'},
    { data: [b4], label: 'Malo'},
    { data: [b5], label: 'Muy malo'}
   ];

   

    this.barChartData=s;
    this.barChartLabels=["Porcentaje de pacientes que tienen conocidos que se atienden en el hospital"];

    this.barChartData2=s2;
    this.barChartLabels2=["Calificación de la atención en el hospital"];
    this.cargo=true;
  }

}
