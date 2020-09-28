import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SimpleDowComponent } from './simple-dow.component';

describe('SimpleDowComponent', () => {
  let component: SimpleDowComponent;
  let fixture: ComponentFixture<SimpleDowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SimpleDowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SimpleDowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
