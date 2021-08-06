import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListActiveExpedienteComponent } from './list-active-expediente.component';

describe('ListActiveExpedienteComponent', () => {
  let component: ListActiveExpedienteComponent;
  let fixture: ComponentFixture<ListActiveExpedienteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListActiveExpedienteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListActiveExpedienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
