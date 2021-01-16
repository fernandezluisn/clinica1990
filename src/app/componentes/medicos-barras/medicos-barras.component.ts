import { Component, OnInit, Input } from '@angular/core';
import { turno } from 'src/app/clases/turno';
import { empleado } from 'src/app/clases/empleado';
import { log } from 'src/app/clases/log';
//graficos
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import * as pluginDataLabels from 'chartjs-plugin-datalabels';
import { Label } from 'ng2-charts';
import { ArchivosService } from 'src/app/servicios/archivos.service';
import { infoMedico } from 'src/app/clases/infoMedico';




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

  @Input() listadoTurnos:turno[];
  listadoTurnosFiltrado:turno[];

  @Input() listadoLogins:log[];
  listadoLoginsFiltrado:log[];

  listaInfos:infoMedico[];

  @Input() listadoEmpleados:empleado[];

  constructor( private impresor:ArchivosService) { 
    this.lapso="la última semana";     
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

  ngOnChanges() {
    if(this.listadoTurnos.length>0)
    this.carg();
    else
    this.cargo=false;
}

  excel(){      
    this.impresor.generarExcel(this.listaInfos, "turnos "+this.lapso);  
  }

  pdf(){
    var element=document.getElementById("barrasM");    
    this.impresor.guardarImagenPdf(element, "barrasMedicos", "Información de los médicos");
  }

  carg(){
    let infos:infoMedico[]=new Array();
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

    this.listadoTurnosFiltrado=this.filtrarListado(this.listadoTurnos);
    this.listadoLoginsFiltrado;

    let logs=new Array();

    this.listadoLogins.filter(log=>{
   


     
      if(Number(Date.parse(log.fecha))<=Number(Date.parse(this.diaInicial.toString())) &&  
      Number(Date.parse(log.fecha))>=Number(Date.parse(this.diaFinal.toString()))){
        logs.push(log);
        
      }
    })

    this.listadoLoginsFiltrado=logs;

    let numeros=new Array();

    let logins=new Array();

    let cantidadDias=new Array();

    let nombres=new Array();
    
    this.listadoEmpleados.forEach(empleado=>{
      
      nombres.push(empleado.nombre+" "+empleado.apellido);
      empleado.cantidadTurnos=0;
      empleado.cantidadLogins=0;
      
      let fechas=new Array();
      this.listadoTurnosFiltrado.forEach(turno=>{
        if(turno.empleado.email.toLowerCase()==empleado.email.toLowerCase()){
          empleado.cantidadTurnos++;

          if(!fechas.includes(turno.fecha))
          fechas.push(turno.fecha);
        }
      })

      this.listadoLoginsFiltrado.forEach(elementL=>{
        if(elementL.email.toLowerCase()==empleado.email.toLowerCase()){
          empleado.cantidadLogins++;
        }
      })

      
      cantidadDias.push(fechas.length);
      logins.push(empleado.cantidadLogins);
      numeros.push(empleado.cantidadTurnos);
      let im=new infoMedico(empleado.nombre+" "+empleado.apellido, empleado.cantidadTurnos, fechas.length, empleado.cantidadLogins);
      infos.push(im);
    })



    let s=[{ data: numeros, label: 'Cantidad de turnos por médico durante '+this.lapso },
    { data: cantidadDias, label: 'Cantidad de días trabajados' },
    { data: logins, label: 'Cantidad de ingresos al sistema' } ];

    this.barChartData=s;
    this.barChartLabels=nombres;
    this.cargo=true;
    this.listaInfos=infos;
    
  }

  filtrarListado(lista){
    let lT=new Array();
    lista.filter(element=>{
      if(Number(Date.parse(element.fecha.toString()))<=Number(Date.parse(this.diaInicial.toString())) &&  
      Number(Date.parse(element.fecha.toString()))>=Number(Date.parse(this.diaFinal.toString()))){        
        lT.push(element);
      }
    })  

    return lT;
  }

}
