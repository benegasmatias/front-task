import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormExpedienteComponent } from './form-expediente.component';

describe('FormExpedienteComponent', () => {
  let component: FormExpedienteComponent;
  let fixture: ComponentFixture<FormExpedienteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormExpedienteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormExpedienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
