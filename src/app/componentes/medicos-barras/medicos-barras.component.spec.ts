import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MedicosBarrasComponent } from './medicos-barras.component';

describe('MedicosBarrasComponent', () => {
  let component: MedicosBarrasComponent;
  let fixture: ComponentFixture<MedicosBarrasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MedicosBarrasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MedicosBarrasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
