import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HorarioMedicosComponent } from './horario-medicos.component';

describe('HorarioMedicosComponent', () => {
  let component: HorarioMedicosComponent;
  let fixture: ComponentFixture<HorarioMedicosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HorarioMedicosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HorarioMedicosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
