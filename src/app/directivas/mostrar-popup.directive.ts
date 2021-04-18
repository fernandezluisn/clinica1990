import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[mostrarPopup]'
})
export class MostrarPopupDirective {
  constructor(private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef) { }

  @Input() set mostrarPopup(visible: boolean) {
    console.log("Anda el popup con directiva");
    if (visible)
      this.viewContainer.createEmbeddedView(this.templateRef);
    else
      this.viewContainer.clear();
  }
  

}
