import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DatosAdminComponent } from './datos-admin.component';

describe('DatosAdminComponent', () => {
  let component: DatosAdminComponent;
  let fixture: ComponentFixture<DatosAdminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DatosAdminComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DatosAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
