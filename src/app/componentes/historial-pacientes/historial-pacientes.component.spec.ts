import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HistorialPacientesComponent } from './historial-pacientes.component';

describe('HistorialPacientesComponent', () => {
  let component: HistorialPacientesComponent;
  let fixture: ComponentFixture<HistorialPacientesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HistorialPacientesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HistorialPacientesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
