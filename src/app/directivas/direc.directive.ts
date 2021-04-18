import { Directive, ElementRef, Input, Renderer2} from '@angular/core';
import { empleado } from '../clases/empleado';

@Directive({
  selector: '[appDirec]'
})
export class DirecDirective { 

  constructor(private el:ElementRef, private renderer: Renderer2) {
    
   }

  @Input()   set appDirec(doctor:empleado) {
    if(doctor.tieneJornada){
      this.renderer.setStyle(this.el.nativeElement, 'backgroundColor', "blue");
      this.renderer.setStyle(this.el.nativeElement, 'color', "white");
      console.log("Tiene turnos "+doctor.apellido);      
    }    
    else{
      this.renderer.setStyle(this.el.nativeElement, 'backgroundColor', "red");
      this.renderer.setStyle(this.el.nativeElement, 'color', "black");
      console.log("No tiene turnos "+doctor.apellido);
    }

  }
       

    
    
  
  
}

  


