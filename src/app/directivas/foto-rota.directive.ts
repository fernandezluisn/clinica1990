import { Directive, ElementRef, Input, Renderer2, TemplateRef, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[appFotoRota]'
})
export class FotoRotaDirective {

  hora;
  constructor(elem: ElementRef, renderer: Renderer2) {
    let dia = renderer.createText('Buen día. Bienvenido a la clínica OnLine');
    let tarde = renderer.createText('Buenas tardes. Bienvenido a la clínica OnLine');
    let noche = renderer.createText('Buenas noches. Bienvenido a la clínica OnLine');
    this.hora=new Date().getHours();
    if(this.hora<20 && this.hora>13){     
      
      renderer.appendChild(elem.nativeElement, tarde);     
    }    
    else if(this.hora<14){
      renderer.appendChild(elem.nativeElement, dia); 
    }else{
      renderer.appendChild(elem.nativeElement, noche);
    }
    
    
    renderer.setStyle(elem.nativeElement, 'font-family', "sans-serif");
   }  

  

}
