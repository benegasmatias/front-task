import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoriaExpedieteComponent } from './historia-expediete.component';

describe('HistoriaExpedieteComponent', () => {
  let component: HistoriaExpedieteComponent;
  let fixture: ComponentFixture<HistoriaExpedieteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HistoriaExpedieteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HistoriaExpedieteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
