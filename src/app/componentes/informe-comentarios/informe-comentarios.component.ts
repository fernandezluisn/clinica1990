import { Component, OnInit } from '@angular/core';
import { comentario } from 'src/app/clases/comentario';
import { TurnosService } from 'src/app/servicios/turnos.service';

//graficos
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import * as pluginDataLabels from 'chartjs-plugin-datalabels';
import { Label } from 'ng2-charts';
import { ArchivosService } from 'src/app/servicios/archivos.service';
import { porcentaje } from 'src/app/clases/porcentajes';
import { atencion } from 'src/app/clases/atencion';

@Component({
  selector: 'app-informe-comentarios',
  templateUrl: './informe-comentarios.component.html',
  styleUrls: ['./informe-comentarios.component.css']
})
export class InformeComentariosComponent implements OnInit {

  promedio:string;

  listaPorcentajes:porcentaje[];
  listaAtenciones:atencion[];

  cargo=false;
  listaC:comentario[];
  constructor(private bda:TurnosService, private impresor:ArchivosService) {

    

    
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
  public barChartLabels3: Label[] = ["0"];
  public barChartType: ChartType = 'bar';
  public barChartLegend = true;
  public barChartPlugins = [pluginDataLabels];

  public barChartData: ChartDataSets[]= [];
  public barChartData2: ChartDataSets[]= [];
  public barChartData3: ChartDataSets[]= [];

  ngOnInit(): void {
  }

  cargarBarras(){
    let fam=0;
    let amig=0;
    let trab=0;

    let est=0;

    let medic=0;

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
      let aten=new atencion(b1,b2,b3,b4,b5);
      let atens:atencion[]=new Array();
      atens.push(aten);
      this.listaAtenciones=atens;
      est=est+coment.preg3;

      medic=medic+coment.preg1;
    });

    let n1=(fam/n)*100;
    let n2=(amig/n)*100;
    let n3=(trab/n)*100;

    let inf=new porcentaje(n3, n2, n1);
    let infd:porcentaje[]=new Array();
    infd.push(inf);

    this.listaPorcentajes=infd;
    let n4=medic/n;
    

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

   let p=est/n;
   this.promedio=Math.round(p).toString();

   let s3=[{ data: [n4], label: 'puntuación del personal médico'}
  ];
   

    this.barChartData=s;
    this.barChartLabels=[""];

    this.barChartData3=s3;
    this.barChartLabels3=[""];

    this.barChartData2=s2;
    this.barChartLabels2=[""];
    this.cargo=true;
  }

  

  excel(num:number){

    if(num==1){
      this.impresor.generarExcel(this.listaPorcentajes, "porcentajes");
    }else if(num==2){
      this.impresor.generarExcel(this.listaAtenciones, "calificacionAtencion");
    }else
      this.impresor.generarExcel(this.listaC,"encuestas");
  }

  pdf(){

  }

  

}
