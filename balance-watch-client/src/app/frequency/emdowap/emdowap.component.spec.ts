import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmdowapComponent } from './emdowap.component';

describe('EmdowapComponent', () => {
  let component: EmdowapComponent;
  let fixture: ComponentFixture<EmdowapComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmdowapComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmdowapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
