import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TurnosConfirmadosComponent } from './turnos-confirmados.component';

describe('TurnosConfirmadosComponent', () => {
  let component: TurnosConfirmadosComponent;
  let fixture: ComponentFixture<TurnosConfirmadosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TurnosConfirmadosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TurnosConfirmadosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
