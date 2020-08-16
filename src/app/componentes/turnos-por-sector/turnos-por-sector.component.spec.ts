import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TurnosPorSectorComponent } from './turnos-por-sector.component';

describe('TurnosPorSectorComponent', () => {
  let component: TurnosPorSectorComponent;
  let fixture: ComponentFixture<TurnosPorSectorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TurnosPorSectorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TurnosPorSectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
