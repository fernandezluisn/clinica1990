import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TurnosSacadosComponent } from './turnos-sacados.component';

describe('TurnosSacadosComponent', () => {
  let component: TurnosSacadosComponent;
  let fixture: ComponentFixture<TurnosSacadosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TurnosSacadosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TurnosSacadosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
