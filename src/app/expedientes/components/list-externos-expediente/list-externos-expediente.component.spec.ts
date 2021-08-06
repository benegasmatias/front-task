import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListExternosExpedienteComponent } from './list-externos-expediente.component';

describe('ListExternosExpedienteComponent', () => {
  let component: ListExternosExpedienteComponent;
  let fixture: ComponentFixture<ListExternosExpedienteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListExternosExpedienteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListExternosExpedienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
