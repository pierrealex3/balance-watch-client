import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmdomComponent } from './emdom.component';

describe('EmdomComponent', () => {
  let component: EmdomComponent;
  let fixture: ComponentFixture<EmdomComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmdomComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmdomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
