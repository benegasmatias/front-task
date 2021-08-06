import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormOficinaComponent } from './form-tasks.component';

describe('FormOficinaComponent', () => {
  let component: FormOficinaComponent;
  let fixture: ComponentFixture<FormOficinaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormOficinaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormOficinaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
