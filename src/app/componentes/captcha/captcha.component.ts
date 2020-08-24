import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-captcha',
  templateUrl: './captcha.component.html',
  styleUrls: ['./captcha.component.css']
})
export class CaptchaComponent implements OnInit {

  n1:number;
  n2:number;
  n3:number;
  respuesta:number;
  @Output() resp:EventEmitter<any>= new EventEmitter<any>();

  constructor() {
    this.n1=Math.floor(Math.random()*10);
    this.n2=Math.floor(Math.random()*10);
    this.n3=this.n1+this.n2;
   }

  ngOnInit(): void {
  }

  enviar(){
    if(this.respuesta==this.n3){
      this.resp.emit(true);
    }else{
      alert("La respuesta de la suma es incorrecta");
    }
  }

}
