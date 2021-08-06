import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListCountActiveExpedienteComponent } from './list-count-active-expediente.component';

describe('ListCountActiveExpedienteComponent', () => {
  let component: ListCountActiveExpedienteComponent;
  let fixture: ComponentFixture<ListCountActiveExpedienteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListCountActiveExpedienteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListCountActiveExpedienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
