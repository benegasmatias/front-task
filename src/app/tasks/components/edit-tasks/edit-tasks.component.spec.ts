import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditOficinasComponent } from './edit-tasks.component';

describe('EditOficinasComponent', () => {
  let component: EditOficinasComponent;
  let fixture: ComponentFixture<EditOficinasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditOficinasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditOficinasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
