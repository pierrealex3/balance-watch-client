import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExwdowComponent } from './exwdow.component';

describe('ExwdowComponent', () => {
  let component: ExwdowComponent;
  let fixture: ComponentFixture<ExwdowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExwdowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExwdowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
