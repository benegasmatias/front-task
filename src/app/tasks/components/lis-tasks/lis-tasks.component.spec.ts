import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LisOficinasComponent } from './lis-tasks.component';

describe('LisOficinasComponent', () => {
  let component: LisOficinasComponent;
  let fixture: ComponentFixture<LisOficinasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LisOficinasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LisOficinasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
