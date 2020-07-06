import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AgregarEspecialidadComponent } from './agregar-especialidad.component';

describe('AgregarEspecialidadComponent', () => {
  let component: AgregarEspecialidadComponent;
  let fixture: ComponentFixture<AgregarEspecialidadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AgregarEspecialidadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AgregarEspecialidadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
