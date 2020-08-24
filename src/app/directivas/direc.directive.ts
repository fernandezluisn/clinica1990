import { Directive, Input, Renderer2, ElementRef, ViewChild } from '@angular/core';

@Directive({
  selector: '[appDirec]'
})
export class DirecDirective {

 // @ViewChild("miTexto") miTexto: ElementRef;

  @Input('appDirec') n1: number;
  @Input() n2: number;

  constructor(private el: Renderer2) { 
    //this.sumar();
  }

  /*private sumar(){
    let text = this.el.createText(this.n1+" + "+this.n2);
    this.el.appendChild(this.miTexto.nativeElement, text);
  }*/

}
