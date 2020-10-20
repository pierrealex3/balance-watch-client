import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmdomwrComponent } from './emdomwr.component';

describe('EmdomwrComponent', () => {
  let component: EmdomwrComponent;
  let fixture: ComponentFixture<EmdomwrComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmdomwrComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmdomwrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
