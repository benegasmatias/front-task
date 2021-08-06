import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TravelExpedienteComponent } from './travel-expediente.component';

describe('TravelExpedienteComponent', () => {
  let component: TravelExpedienteComponent;
  let fixture: ComponentFixture<TravelExpedienteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TravelExpedienteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TravelExpedienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
