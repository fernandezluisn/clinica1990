import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.css']
})
export class PopupComponent implements OnInit {
  
  @Input() color: string;
  @Input() mensaje:string;
  @Output() cerrarPopup:EventEmitter<any>=new EventEmitter<any>();
  constructor() { }

  ngOnInit(): void {
  }

  cerrar(){
    this.cerrarPopup.emit(false);
  }

}
