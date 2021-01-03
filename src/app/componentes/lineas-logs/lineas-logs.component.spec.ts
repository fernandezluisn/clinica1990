import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LineasLogsComponent } from './lineas-logs.component';

describe('LineasLogsComponent', () => {
  let component: LineasLogsComponent;
  let fixture: ComponentFixture<LineasLogsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LineasLogsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LineasLogsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
