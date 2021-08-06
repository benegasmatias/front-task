import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListExpedienteComponent } from './list-expediente.component';

describe('ListExpedienteComponent', () => {
  let component: ListExpedienteComponent;
  let fixture: ComponentFixture<ListExpedienteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListExpedienteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListExpedienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
