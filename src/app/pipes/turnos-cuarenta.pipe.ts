import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'turnosCuarenta'
})
export class TurnosCuarentaPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    let d;
    switch(value){
      case(0):
      d="8:00";
      case(1):
      d="8:45";
      break;
      case(2):
      d="9:30";
      break;
      case(3):
      d="10:15";
      break;
      case(4):
      d="11:00";
      break;
      case(5):
      d="11:45";
      break;
      case(6):
      d="12:30";
      break;
      case(7):
      d="13:15";
      break;
      case(8):
      d="14:00";
      break;
      case(9):
      d="14:45";
      break;
      case(10):
      d="15:30";
      break;
      case(11):
      d="16:15";
      break;
      case(12):
      d="17:00";
      break;
      case(13):
      d="17:45";
      break;
      case(14):
      d="18:30";
      break;
      case(15):
      d="19:15";
      break;
     
    }
    return d;
  }

}
