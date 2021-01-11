import { Component, OnInit, Input} from '@angular/core';
import { turno } from 'src/app/clases/turno';
import {ArchivosService} from '../../servicios/archivos.service';

//graficos
import { ChartDataSets, ChartOptions } from 'chart.js';
import { Color, Label } from 'ng2-charts';
import * as pluginAnnotations from 'chartjs-plugin-annotation';

import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";
import { paciente } from 'src/app/clases/paciente';
import { infoTurno } from 'src/app/clases/infoTurn';

@Component({
  selector: 'app-turnos-por-dia',
  templateUrl: './turnos-por-dia.component.html',
  styleUrls: ['./turnos-por-dia.component.css']
})
export class TurnosPorDiaComponent implements OnInit {

  cargo=false;

  díaFinal;
  diaInicial;

  lunes;
  martes;
  miercoles;
  jueves;
  viernes;
  sabado;
  domingo=0;

  pacienteE:string;
  
  @Input() listadoTurnos:turno[];
  listaFiltrada:turno[];

  @Input() pacientes:paciente[];
  turnosDelPaciente:turno[];
  turnP=false;

  constructor(private impresor:ArchivosService) { 
    
    let hoy=new Date();
    this.diaInicial=new Date(hoy.getFullYear(), hoy.getMonth(), hoy.getDate());
    this.díaFinal=new Date(hoy.getFullYear(), hoy.getMonth(), hoy.getDate()+7);     
    
    
  }

  ngOnChanges() {
    if(this.listadoTurnos.length>0)
    this.filtrarListado(this.listadoTurnos);
    else
    this.cargo=false;
}


  carg(){
    
    this.turnP=false;
    let tur:turno[]=new Array();
    this.listadoTurnos.filter(elem=>{      
      if(elem.paciente.email==this.pacienteE){
        tur.push(elem);
      }
    })
    tur.sort((a,b) => Number(Date.parse(a.fecha.toString())) - Number(Date.parse(b.fecha.toString())));

    this.turnosDelPaciente=tur;

    if(tur.length>0){
      this.turnP=true;
    }else{
      this.turnP=false;
    }
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
  public lineChartLabels: Label[] = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'];

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
    { // grey
      backgroundColor: 'rgba(348,159,177,0.2)',
      borderColor: 'rgba(348,159,177,1)',
      pointBackgroundColor: 'rgba(348,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(348,159,177,0.8)'
    }
  ];
  public lineChartLegend = true;
  public lineChartType = 'line';
  public lineChartPlugins = [pluginAnnotations];

  public lineChartData: ChartDataSets[]= [
    //{ data: [this.lunes, this.martes, this.miercoles, this.jueves, this.viernes, this.sabado, this.domingo], label: 'Cantidad de turnos por día durante la próxima semana' }    
  ];
 

  ngOnInit(): void {
    
  }

  excel(){
    let listTurn:infoTurno[]=new Array();
    this.listaFiltrada.forEach(elem=>{
      let tr=new infoTurno(elem.fecha.toString(), elem.empleado.apellido+", "+elem.empleado.nombre, elem.especialidad, elem.paciente.apellido+", "+elem.paciente.nombre,
      elem.numeroTurno.toString(), elem.estado);
      listTurn.push(tr);
    })
    listTurn.sort((a,b) => Number(Date.parse(a.fecha.toString())) - Number(Date.parse(b.fecha.toString())));
    this.impresor.generarExcel(listTurn, "turnos"+Date().toString());
  }

  pdf2(){

  }

  excel2(){
    let listTurn:infoTurno[]=new Array();
    this.turnosDelPaciente.forEach(elem=>{
      let tr=new infoTurno(elem.fecha.toString(), elem.empleado.apellido+", "+elem.empleado.nombre, elem.especialidad, elem.paciente.apellido+", "+elem.paciente.nombre,
      elem.numeroTurno.toString(), elem.estado);
      listTurn.push(tr);
    })
    listTurn.sort((a,b) => Number(Date.parse(a.fecha.toString())) - Number(Date.parse(b.fecha.toString())));
    this.impresor.generarExcel(listTurn, "turnos paciente "+this.pacienteE);
  }

  pdf(){
    //this.impresor.generarPdf(Date().toString(), this.listaFiltrada);
    var element=document.getElementById("my-canvas");

    html2canvas(element).then(canvas=>{
      console.log(canvas);
      var imgData=canvas.toDataURL("image/png");

      var doc= new jsPDF('p','pt','a4');

      

      doc.addImage(imgData, 0,0,600,400);
      doc.save("image.pdf");
    })
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

    this.lineChartData= [
      { data: [this.lunes, this.martes, this.miercoles, this.jueves, this.viernes, this.sabado, this.domingo], label: 'Cantidad de turnos por día durante la próxima semana' }    
    ];

    this.listaFiltrada=lT;
    this.cargo=true;
  }

}
