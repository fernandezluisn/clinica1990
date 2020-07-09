import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'turnosHora'
})
export class TurnosHoraPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    let d;
    switch(value){
      case(1):
      d="9:00";
      break;
      case(2):
      d="10:00";
      break;
      case(3):
      d="11:00";
      break;
      case(4):
      d="12:00";
      break;
      case(5):
      d="13:00";
      break;
      case(6):
      d="14:00";
      break;
      case(7):
      d="15:00";
      break;
      case(8):
      d="16:00";
      break;
      case(9):
      d="17:00";
      break;
      case(10):
      d="18:00";
      break;
      case(11):
      d="19:00";
      break;
     
    }
    return d;
  }

}
