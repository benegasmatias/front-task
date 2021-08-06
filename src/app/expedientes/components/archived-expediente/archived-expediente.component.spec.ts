import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArchivedExpedienteComponent } from './archived-expediente.component';

describe('ArchivedExpedienteComponent', () => {
  let component: ArchivedExpedienteComponent;
  let fixture: ComponentFixture<ArchivedExpedienteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ArchivedExpedienteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArchivedExpedienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
