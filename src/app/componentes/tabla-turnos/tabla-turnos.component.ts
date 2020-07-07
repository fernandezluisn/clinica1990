import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-tabla-turnos',
  templateUrl: './tabla-turnos.component.html',
  styleUrls: ['./tabla-turnos.component.css']
})
export class TablaTurnosComponent implements OnInit {

  @Input() aConfirmar:boolean;
  constructor() { }

  ngOnInit(): void {
  }

}
