import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubmitExpedienteComponent } from './submit-expediente.component';

describe('SubmitExpedienteComponent', () => {
  let component: SubmitExpedienteComponent;
  let fixture: ComponentFixture<SubmitExpedienteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubmitExpedienteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubmitExpedienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
