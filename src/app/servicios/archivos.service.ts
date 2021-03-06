import { Injectable } from '@angular/core';

import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
pdfMake.vfs = pdfFonts.pdfMake.vfs;
import { jsPDF } from "jspdf";
import * as htmlToImage from 'html-to-image';

@Injectable({
  providedIn: 'root'
})
export class ArchivosService {

  tipoArchivo;
  extensionArchivo;

  constructor() {
    this.tipoArchivo = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
    this.extensionArchivo = '.xlsx';
   }

   ///Genera un archivo excel con el contenido y el nombre de archivo que se ingresa
  generarExcel(jsonData: any[], nombre: string): void {
    
    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(jsonData);
    const wb: XLSX.WorkBook = { Sheets: { 'data': ws }, SheetNames: ['data'] };
    const excelBuffer: any = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
    this.guardarArchivoExcel(excelBuffer, nombre);
  }

  private guardarArchivoExcel(buffer: any, fileName: string): void {
    const data: Blob = new Blob([buffer], {type: this.tipoArchivo});
    FileSaver.saveAs(data, fileName + this.extensionArchivo);
  }

  ///Genera un pdf con el titulo y la lista que se le pasan
  ///El contenido se divide en columnas
  generarPdf(titulo, lista){
    const documentDefinition = this.getContenidoPdf(titulo, lista);
    pdfMake.createPdf(documentDefinition).download();
  }

  getContenidoPdf(titulo, lista) {
    return {
      content: [
        {
          text: titulo,
          bold: true,
          fontSize: 20,
          alignment: 'center',
          margin: [0, 0, 0, 20],
        },
        this.generarTabla(lista),
      ],
      info: {
        title: titulo,
        author: 'Clinica OnLine',
        subject: titulo,
        keywords: titulo,
      },
      styles: {
        name: {
          fontSize: 16,
          bold: true
        },
        tableHeader: {
          bold: true,
        }
      }
    }     
  }

  generarTabla(listaIngresos:any) {
    const lista = [];
    let itemLista = [];
    let columnas=[];
    let contenido;
    let datos;
    
    for(let ingreso of listaIngresos) {
      columnas = [];
      contenido = [];
    
      for (const [key, value] of Object.entries(ingreso)) {

        datos = {
          text: value
        }
        contenido.push(datos);        
      }

      columnas.push(contenido);
        itemLista.push({columns: columnas});
        lista.push(
          [{
          columns: columnas,
        }]);  
    }

    return {
      table: {
        widths: ['*'],
        body: [
          ...lista
        ]
      }
    };
  }

  guardarImagenPdf(elementoHTML:any, titulo:string, texto:string){
 
    htmlToImage.toPng(elementoHTML).then(canvas=>{
      const img = new Image();
      img.src = canvas;
      const pdf = new jsPDF('l', 'mm', 'a4');
      pdf.text('Clinica On-line', 20, 20);

      pdf.text(texto, 30, 50);
      pdf.setLineWidth(1);
      pdf.addImage(img, 'PNG', 40, 60, 353, 176);
      pdf.save(titulo+".pdf");       
  })
  }
}
