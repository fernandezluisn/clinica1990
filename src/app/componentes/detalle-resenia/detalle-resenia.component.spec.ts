import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalleReseniaComponent } from './detalle-resenia.component';

describe('DetalleReseniaComponent', () => {
  let component: DetalleReseniaComponent;
  let fixture: ComponentFixture<DetalleReseniaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetalleReseniaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetalleReseniaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
