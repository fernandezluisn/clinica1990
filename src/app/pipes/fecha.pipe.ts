import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'fechaP'
})
export class FechaPipe implements PipeTransform {

  transform(value: any, ...args: unknown[]): unknown {
    
    let dia:string; 
    let mes:string;
    let fecha=value.toString();
    

    if(fecha.substr(8,1)=="0"){
      dia=fecha.substr(9,1);
    }else{
      dia=fecha.substr(8,2);
    }
    
    console.log(fecha);
    console.log(value.getMonth());
    switch(value.getMonth()+1){
      case 1:
      mes="enero"
      break;
      case 2:
      mes="febrero"
      break;
      case 3:
      mes="marzo"
      break;
      case 4:
      mes="abril"
      break;
      case 5:
      mes="mayo"
      break;
      case 6:
      mes="junio"
      break;
      case 7:
      mes="julio"
      break;
      case 8:
      mes="agosto"
      break;
      case 9:
      mes="septiembre"
      break;
      case 10:
      mes="octubre"
      break;
      case 11:
      mes="noviembre"
      break;
      case 12:
      mes="diciembre"
      break;
    }
    let cadena=("el día "+dia+" de "+mes);
    return cadena;
  }

}
