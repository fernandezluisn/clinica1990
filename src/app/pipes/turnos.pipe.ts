import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'turnos'
})
export class TurnosPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    let d;
    switch(value){
      case(1):
      d="9:00";
      break;
      case(2):
      d="9:30";
      break;
      case(3):
      d="10:00";
      break;
      case(4):
      d="10:30";
      break;
      case(5):
      d="11:00";
      break;
      case(6):
      d="11:30";
      break;
      case(7):
      d="12:00";
      break;
      case(8):
      d="12:30";
      break;
      case(9):
      d="13:00";
      break;
      case(10):
      d="13:30";
      break;
      case(11):
      d="14:00";
      break;
      case(12):
      d="14:30";
      break;
      case(13):
      d="15:00";
      break;
      case(14):
      d="15:30";
      break;
      case(15):
      d="16:00";
      break;
      case(16):
      d="16:30";
      break;
      case(17):
      d="17:00";
      break;
      case(18):
      d="17:30";
      break;
      case(19):
      d="18:00";
      break;
      case(20):
      d="18:30";
      break;
      case(21):
      d="19:00";
      break;
      case(22):
      d="19:30";
      break;
    }
    return d;
  }

}
