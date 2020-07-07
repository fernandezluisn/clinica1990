import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TurnosAConfirmarComponent } from './turnos-aconfirmar.component';

describe('TurnosAConfirmarComponent', () => {
  let component: TurnosAConfirmarComponent;
  let fixture: ComponentFixture<TurnosAConfirmarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TurnosAConfirmarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TurnosAConfirmarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
